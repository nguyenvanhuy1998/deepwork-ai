-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name VARCHAR,
    avatar_url VARCHAR,
    preferences JSONB,
    time_zone VARCHAR,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id),
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    due_date TIMESTAMP WITH TIME ZONE,
    priority INTEGER,
    status VARCHAR DEFAULT 'todo',
    tags VARCHAR[],
    ai_priority_score FLOAT,
    estimated_duration INTEGER,
    parent_task_id UUID REFERENCES public.tasks(id)
);

-- Create focus_sessions table
CREATE TABLE IF NOT EXISTS public.focus_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id),
    task_id UUID REFERENCES public.tasks(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    duration INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    focus_score FLOAT,
    notes TEXT,
    interruptions INTEGER
);

-- Create productivity_insights table
CREATE TABLE IF NOT EXISTS public.productivity_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    insight_type VARCHAR NOT NULL,
    content TEXT NOT NULL,
    data_points JSONB,
    dismissed BOOLEAN DEFAULT FALSE
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id),
    achievement_type VARCHAR NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE,
    progress FLOAT DEFAULT 0,
    metadata JSONB
);

-- Create tags table
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id),
    name VARCHAR NOT NULL,
    color VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    type VARCHAR NOT NULL,
    content TEXT NOT NULL,
    action_url VARCHAR
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id_status ON public.tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id_due_date ON public.tasks(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_focus_sessions_user_id_started_at ON public.focus_sessions(user_id, started_at);
CREATE INDEX IF NOT EXISTS idx_tasks_ai_priority_score ON public.tasks(ai_priority_score);

-- Create trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to tables with updated_at column
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.created_at,
        NEW.created_at
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create a user record when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to update user's last login timestamp
CREATE OR REPLACE FUNCTION public.handle_user_login()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users
    SET last_login = NOW()
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to update last_login when a user signs in
DROP TRIGGER IF EXISTS on_auth_user_login ON auth.users;
CREATE TRIGGER on_auth_user_login
    AFTER UPDATE OF last_sign_in_at ON auth.users
    FOR EACH ROW
    WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
    EXECUTE FUNCTION public.handle_user_login();

-- Create RLS (Row Level Security) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productivity_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY users_policy ON public.users
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Create policies for tasks table
CREATE POLICY tasks_policy ON public.tasks
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create policies for focus_sessions table
CREATE POLICY focus_sessions_policy ON public.focus_sessions
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create policies for productivity_insights table
CREATE POLICY productivity_insights_policy ON public.productivity_insights
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create policies for achievements table
CREATE POLICY achievements_policy ON public.achievements
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create policies for tags table
CREATE POLICY tags_policy ON public.tags
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create policies for notifications table
CREATE POLICY notifications_policy ON public.notifications
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid()); 