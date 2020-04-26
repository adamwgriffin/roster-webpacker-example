Rails.application.routes.draw do
  root 'listing_management#index'
  resources :separate_vue, only: [:index]
end
