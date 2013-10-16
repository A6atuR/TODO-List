class TasksController < ApplicationController
  def create
    @project = current_user.projects.find(params[:project_id])
    @task = @project.tasks.create(params[:task].permit(:name, :deadline))
    max_priority = @project.tasks.maximum("priority")
    if !max_priority
      @task.priority = 0;
    else
      @task.priority = max_priority + 1;
    end  
    @task.save
    if @task.save
      render json: @task
    else
      render nothing: true
    end
  end

  def destroy
    @project = current_user.projects.find(params[:project_id])
    @task = @project.tasks.find(params[:id])
    @task.destroy
    render json: @task 
  end

  def show
    @project = current_user.projects.find(params[:project_id])
    @task = @project.tasks.find(params[:id])
    render json: @task
  end

  def update
    @project = current_user.projects.find(params[:project_id])
    @task = @project.tasks.find(params[:id])
    @task.update(params[:task].permit(:name, :status, :deadline))
    if @task.save
      render json: @task
    else
      render nothing: true
    end
  end

  def sort
    @project = current_user.projects.find(params[:project_id])
    index = 0
    post_values = params[:task]
    post_values.each do |v|
      task = Task.find(v)
      task.priority = index
      task.save
      index += 1
    end
    render nothing: true
  end

end