import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";

import pokeballBackgroundImage from "../../global/assets/Pokeball-bg.png";
import dotsCardImage from "../../global/assets/Pattern.png";
import backImage from "../../global/assets/Back.png";

import * as S from "./DetalhesScreen.styles";

import { NavigationScreenProps } from "../../navigation/types";
import {api} from "../../api";

type keyValue = {
  key: string,
  value: number
}


type PokemonObject = {
  id?: number;
  name: string;
  type: string[];
  base: keyValue[];
};


export function DetalhesScreen(props: NavigationScreenProps<"DetalhesScreen">) {

  const { navigation } = props;
  const { id } = props.route.params;
  var tipoPokemon = "normal";

  let initialState: PokemonObject = {
    name: '',
    type: ["normal"],
    base: []
  };

  const [pokemonObj, setPokemon] = useState<PokemonObject>(initialState);

  function voltarALista(){
    navigation.navigate("ListaScreen");
  }

  useEffect(() => {

    async function carregarLista(pokemonId: number) {
      const pokemon = await api.get("pokemons/" + pokemonId);
      const pokemonData = pokemon.data;
      let total = 0;

      // criando um novo objeto do tipo PokemonObject
      let pokemonObj: PokemonObject = {
        name: pokemonData.name,
        id: pokemonData.id,
        type: pokemonData.type,
        base: []
      };

      // excplode o objeto base
      Object.keys(pokemonData.base).forEach(function(objkey) {

        // optei por trabalhar com chave / valor
        const newObj: keyValue = {
          key:  objkey,
          value: pokemonData.base[objkey]
        }

        // soma os valores para pegar o total
        total += pokemonData.base[objkey];

        // envia o objeto para o array
        pokemonObj.base.push(newObj);
      });

      // cria e envia o total para o array base
      const objTotal = {
        key:  'Total',
        value: total
      }
      pokemonObj.base.push(objTotal);
      setPokemon(pokemonObj);
    }

    carregarLista(id);
  }, []);

  return (

    <S.Container tipo={pokemonObj.type[0].toLowerCase()} >
      <S.Header>
        <S.ContainerBackgroundImage source={pokeballBackgroundImage} />

        <S.DotsBackgroundImage source={dotsCardImage} />

        <S.GoBackButton onPress={voltarALista}>
          <S.GoBackImage source={backImage} />
        </S.GoBackButton>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <S.PokemonName>{pokemonObj.name}</S.PokemonName>
            <S.TypeList>

              {pokemonObj.type?.map((type, index) => (
                <S.Badge key={index} tipo={pokemonObj.type[index].toLowerCase()}>
                  <S.BadgeText>{type}</S.BadgeText>
                </S.Badge>
              ))}

            </S.TypeList>
          </View>
          <S.PokemonNumber>#{pokemonObj.id?.toString().padStart(3, "0")}</S.PokemonNumber>
        </View>

        <S.PokemonImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonObj.id?.toString()}.png`,
          }}
        />
      </S.Header>

      <S.Content>
        <S.ScrollView>
          <S.Paragraph>Status</S.Paragraph>

          {pokemonObj.base.map((item, index) => (
              <S.Status key={index}>
                <S.Type>{item.key}</S.Type>
                <S.Value>{item.value}</S.Value>

                <S.PercentBar>
                  <S.Percent percentual={item.value}  tipo={pokemonObj.type[0].toLowerCase()}/>
                </S.PercentBar>
              </S.Status>
          ))}

        </S.ScrollView>
      </S.Content>
    </S.Container>
  );
}
