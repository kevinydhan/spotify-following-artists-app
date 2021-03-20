import type { IFieldResolver } from 'apollo-server-micro'

import {
  GetAllArtistAlbums,
  getAllArtistAlbums,
  getAllFollowedArtists,
} from '@/modules/spotify'

type FieldResolver<Arguments = Record<string, never>> = IFieldResolver<
  unknown,
  unknown,
  Arguments
>

const resolveFollowingArtistsQuery: FieldResolver = () => {
  return getAllFollowedArtists()
}

const resolveArtistAlbumsQuery: FieldResolver<{
  artistId: Parameters<GetAllArtistAlbums>[0]
}> = (parent, { artistId }) => {
  return getAllArtistAlbums(artistId)
}

const resolveAlbumTracksQuery: FieldResolver<{
  albumId: string
}> = (parent) => {
  return []
}

export default {
  Query: {
    followingArtists: resolveFollowingArtistsQuery,
    artistAlbums: resolveArtistAlbumsQuery,
    albumTracks: resolveAlbumTracksQuery,
  },
}
