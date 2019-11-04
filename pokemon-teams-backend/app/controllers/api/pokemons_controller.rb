class Api::PokemonsController < ApplicationController


    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        poke = Pokemon.create(nickname: name, species: species, trainer_id: params["trainer_id"])
        render json: PokemonSerializer.new(poke)
    end

    def destroy
        Pokemon.destroy(params[:id])
    end
end
