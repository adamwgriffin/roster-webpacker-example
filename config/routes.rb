Rails.application.routes.draw do
  root 'home#index'
  resources :ads, only: [:index]
  resources :separate_vue, only: [:index]
  resources :vue_example, only: [:index]
end
