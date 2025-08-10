-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Companies policies
CREATE POLICY "Anyone can view companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Recruiters and admins can manage companies" ON companies FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('recruiter', 'admin')
  ));

-- Jobs policies
CREATE POLICY "Anyone can view active jobs" ON jobs FOR SELECT 
  USING (status = 'active' OR recruiter_id = auth.uid());
CREATE POLICY "Recruiters can manage their jobs" ON jobs FOR ALL 
  USING (recruiter_id = auth.uid());
CREATE POLICY "Admins can manage all jobs" ON jobs FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Projects policies
CREATE POLICY "Anyone can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Candidates can manage own projects" ON projects FOR ALL 
  USING (candidate_id = auth.uid());

-- Applications policies
CREATE POLICY "Users can view own applications" ON applications FOR SELECT 
  USING (candidate_id = auth.uid() OR EXISTS (
    SELECT 1 FROM jobs WHERE id = job_id AND recruiter_id = auth.uid()
  ));
CREATE POLICY "Candidates can create applications" ON applications FOR INSERT 
  WITH CHECK (candidate_id = auth.uid());
CREATE POLICY "Recruiters can update applications for their jobs" ON applications FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM jobs WHERE id = job_id AND recruiter_id = auth.uid()
  ));

-- Interviews policies
CREATE POLICY "Users can view own interviews" ON interviews FOR SELECT 
  USING (interviewer_id = auth.uid() OR EXISTS (
    SELECT 1 FROM applications a WHERE a.id = application_id AND a.candidate_id = auth.uid()
  ));
CREATE POLICY "Recruiters can manage interviews" ON interviews FOR ALL 
  USING (interviewer_id = auth.uid() OR EXISTS (
    SELECT 1 FROM applications a JOIN jobs j ON a.job_id = j.id 
    WHERE a.id = application_id AND j.recruiter_id = auth.uid()
  ));

-- Assessments policies
CREATE POLICY "Users can view own assessments" ON assessments FOR SELECT 
  USING (candidate_id = auth.uid() OR EXISTS (
    SELECT 1 FROM jobs WHERE id = job_id AND recruiter_id = auth.uid()
  ));
CREATE POLICY "Candidates can create assessments" ON assessments FOR INSERT 
  WITH CHECK (candidate_id = auth.uid());
