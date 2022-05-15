import React from "react";

import pokeballCardImage from "../../global/assets/Pokeball.png";
import dotsCardImage from "../../global/assets/Pattern.png";

import * as S from "./styles";

import { NavigationScreenProps } from "../../navigation/types";

export type CardPokemonProps = {
  id: number;
  nome: string;
  tipo: string[];
  props: NavigationScreenProps<"ListaScreen">
};


export function CardPokemon({ id, nome, tipo, props }: CardPokemonProps) {

  const { navigation } = props;

  function handleNavigation(pokemon_id: number){
      navigation.navigate("DetalhesScreen", { id: pokemon_id });
  }

  return (
    <S.Card activeOpacity={0.9} tipo={tipo[0].toLowerCase()} onPress={() => handleNavigation(id)}>
      <S.CardLeft>
        <S.CardDotsBackgroundImage source={dotsCardImage} />

        <S.CardPokemonNumber>
          #{id.toString().padStart(3, "0")}
        </S.CardPokemonNumber>
        <S.CardPokemonName>{nome}</S.CardPokemonName>

        <S.CardPokemonTypeList>
          {tipo.map((item, index) => (
            <S.CardPokemonTypeBadge key={index} tipo={item.toLowerCase()}>
              <S.CardPokemonType>{item}</S.CardPokemonType>
            </S.CardPokemonTypeBadge>
          ))}
        </S.CardPokemonTypeList>
      </S.CardLeft>

      <S.CardRigth>
        <S.CardPokemonBackgroundImage source={pokeballCardImage} />

        <S.CardPokemonImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          }}
        />
      </S.CardRigth>
    </S.Card>
  );
}
