import React, { useState, useEffect } from "react";

import pokeballBackgroundImage from "../../global/assets/Pokeball-bg-half.png";
import { CardPokemon } from "../../components/CardPokemon";
import { api } from "../../api";

import * as S from "./ListaScreen.styles";

type PokemonProps = {
  id: number;
  name: string;
  type: string[];
};

import { NavigationScreenProps } from "../../navigation/types";
import {FlatList} from "react-native";

export function ListaScreen(props: NavigationScreenProps<"ListaScreen">) {

  const { navigation } = props;

  const [listaPokemon, setListaPokemon] = useState<PokemonProps[]>([]);

  useEffect(() => {
    async function carregarLista() {
      const response = await api.get("pokemons");
      setListaPokemon(response.data);
    }

    carregarLista();
  }, []);

  return (
    <S.Container>
      <S.ContainerBackgroundImage source={pokeballBackgroundImage} />

      <S.MainView>
        <S.Title>Pokédex</S.Title>
        <S.Paragraph>Encontre todos os pokémons em um só lugar.</S.Paragraph>

        <S.Content>
          <FlatList
              data={listaPokemon}
              renderItem={({item}) => <CardPokemon id={item.id} nome={item.name} tipo={item.type} props={props} /> }
          />
        </S.Content>
      </S.MainView>
    </S.Container>
  );
}
