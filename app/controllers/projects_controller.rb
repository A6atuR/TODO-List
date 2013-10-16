class ProjectsController < ApplicationController
  before_filter :authenticate_user!
  def index
    @projects = current_user.projects
    @project = Project.new
  end
  
  def create
    @project = current_user.projects.create(params[:project].permit(:name))
    if @project.save
      render json: @project
    else
      render nothing: true
    end
  end

  def show
    @project = Project.find(params[:id])
    render json: @project
  end

  def update
    @project = Project.find(params[:id])
    @project.update(params[:project].permit(:name))
    if @project.save
      render json: @project
    else
      render nothing: true
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render json: @project
  end
end