import { images } from '@/constants/images'
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import MovieCard from '../components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'

const Search = () => {

  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: movies, 
    loading: loadMovies, 
    error: movieError,
    refetch: reLoadMovies,
    reset
  } = useFetch(() => fetchMovies({
  query: searchQuery
  }),false);

  useEffect(() => {
    const func = async() => {
      if(searchQuery.trim()) {
        await reLoadMovies();
      } else {
        reset();
      }
    }
    func();
  }, [searchQuery])

  return (
    <View className='flex-1 bg-primary'>

      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
      
      <FlatList 
        data={movies} 
        renderItem={({item}) => <MovieCard {...item} /> } 
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{paddingBottom: 100}}
        ListHeaderComponent={
          <>

            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10'/>
            </View>

            <View className='my-5'>
              <SearchBar
               placeholder='Search a movie...' 
               value={searchQuery}
               onChangeText={(text: string) => setSearchQuery(text)}
               />
            </View>

            {loadMovies && (
              <ActivityIndicator size={"large"} color={"#0000ff"} className='my-3'/>
            )}

            {movieError && (
              <Text className='text-red-500 px-5 my-3'>
                Error: {movieError.message}
              </Text>
            )}

            {!loadMovies && !movieError && searchQuery.trim() && movies?.length > 0 &&(
              <Text className='text-xl text-white font-bold'>
                Search Result for {""} 
                <Text className='text-accent'> {searchQuery}</Text>
              
              </Text>
            )}

          </>
        }
      />

    </View>
  )
}

export default Search