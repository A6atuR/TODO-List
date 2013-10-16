Todolist::Application.routes.draw do
  devise_for :users
  resources :users
  resources :projects do
  	resources :tasks
  	post 'tasks/sort', to: 'tasks#sort'
  end
  

root "projects#index" 

  
end
