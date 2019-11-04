Rails.application.routes.draw do

  namespace :api do
    resources :pokemons
    resources :trainers
  end

end
