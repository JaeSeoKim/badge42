import axios, { AxiosInstance } from 'axios'

export const END_POINT_42API = 'https://api.intra.42.fr'

export class Client42API {
  axiosClient: AxiosInstance

  #client_id: string
  #client_secret: string
  #token?: Get42OauthToken

  constructor({
    client_id,
    client_secret
  }: {
    client_id: string
    client_secret: string
  }) {
    this.#client_id = client_id
    this.#client_secret = client_secret

    this.axiosClient = axios.create({
      baseURL: END_POINT_42API
    })

    this.axiosClient.interceptors.request.use(
      async config => {
        if (!this.validateToken()) {
          await this.updateToken()
        }
        config.headers.set(
          'Authorization',
          `Bearer ${this.#token!.access_token}`
        )
        config.headers.set('Accept', 'application/json')

        if (!config.params) config.params = {}
        const pageNumber = config.params['page[number]'] ?? '1'
        const pageSize = config.params['page[size]'] ?? '100'

        config.params = {
          ...config.params,
          'page[number]': pageNumber,
          'page[size]': pageSize
        }
        return config
      },
      error => {
        Promise.reject(error)
      }
    )

    this.axiosClient.interceptors.response.use(
      async response => {
        const perPage = response.headers['X-Per-Page']
        const page = response.headers['X-Page']
        const total = response.headers['X-Total']

        if (page === total) {
          return response
        }

        const { config } = response

        config.params && {
          ...config.params,
          'page[number]': page + 1,
          'page[size]': perPage
        }
        const { data } = await this.axiosClient(config)

        response.data = [...response.data, ...data]

        return response
      },
      async error => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          await this.updateToken()

          originalRequest.headers['Authorization'] =
            'Bearer ' + this.#token!.access_token

          return this.axiosClient(originalRequest)
        }
        return Promise.reject(error)
      }
    )
  }

  validateToken = () => validateToken(this.#token)

  updateToken = async () => {
    const { data } = await this.get42OauthToken()
    this.#token = data
  }

  get42OauthToken = () =>
    axios.post<Get42OauthToken>(`${END_POINT_42API}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: this.#client_id,
      client_secret: this.#client_secret
    })

  get42User = (id: string | number) =>
    this.axiosClient.get<User>(`/v2/users/${id}`)

  get42Cursus = (params?: Partial<PageParams>) =>
    this.axiosClient.get<Cursus[]>('/v2/cursus', {
      params
    })
}

export const validateToken = (token?: Get42OauthToken) => {
  if (!token) return false

  const { created_at, expires_in } = token
  if (created_at + expires_in - Date.now()) {
    return true
  }

  return false
}

// export const axiosClientFor42 = axios.create({
//   baseURL: END_POINT_42API
// })

// export const axiosClientFor42Pagenation = async <
//   Data extends object,
//   Params extends object = object
// >(
//   url: string,
//   params?: Partial<PageParams> & Partial<Params>
// ) => {
//   const res = await axiosClientFor42.get<Data>(url, {
//     params: params && {
//       ...params,
//       'page[number]': params['page[number]'] ? params['page[number]'] : 1,
//       'page[size]': params['page[size]'] ? params['page[size]'] : 100
//     }
//   })
//   return res as AxiosResponse<Data, Params> & {
//     headers: PageHeader
//   }
// }

// axiosClientFor42.interceptors.request.use(
//   async config => {
//     config.headers = {
//       Authorization: `Bearer ${access_token}`,
//       Accept: 'application/json'
//     }
//     return config
//   },
//   error => {
//     Promise.reject(error)
//   }
// )

// axiosClientFor42.interceptors.response.use(
//   response => {
//     return response
//   },
//   async function (error) {
//     const originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       const { data: token } = await get42OauthToken()
//       if (token) {
//         originalRequest.headers['Authorization'] =
//           'Bearer ' + token.access_token
//         const ttl = token.created_at + token.expires_in - Date.now()
//         apiCache.set('token', token.access_token, ttl)
//       }
//       return axios(originalRequest)
//     }
//     return Promise.reject(error)
//   }
// )

export type PageParams = {
  'page[number]': number
  'page[size]': number
}

export type PageHeader = {
  'x-per-page': string
  'x-page': string
  'x-total': string
}

export type User = UserBase & {
  groups: []
  cursus_users: CursusUser[]
  projects_users: ProjectUser[]
  languages_users: []
  achievements: Achievement[]
  titles: Title[]
  titles_users: TitleUser[]
  partnerships: []
  patroned: []
  patroning: []
  expertises_users: []
  roles: []
  campus: Campus[]
  campus_users: CampusUser[]
}

export type UserBase = {
  id: number
  email: string
  login: string
  first_name: string
  last_name: string
  usual_full_name: string
  usual_first_name: string
  url: string
  phone: string
  displayname: string
  image_url: string
  new_image_url: string
  'staff?': boolean
  correction_point: number
  pool_month: string
  pool_year: string
  location?: string
  wallet: number
  anonymize_date: string
  created_at: string
  updated_at: string
  alumni: boolean
  'is_launched?': boolean
}

export type Skill = {
  id: number
  name: string
  level: number
}

export type Cursus = {
  id: number
  created_at: string
  name: string
  slug: string
}

export type CursusUser = {
  id: number
  grade?: string
  level: number
  skills: Skill[]
  blackholed_at?: string
  begin_at: string
  end_at?: string
  cursus_id: number
  has_coalition: boolean
  created_at: string
  updated_at: string
  user: UserBase
  cursus: Cursus
}

export type ProjectUser = {
  id: number
  occurrence: number
  final_mark?: number
  status: string
  'validated?'?: boolean
  current_team_id?: number
  project: Project
  cursus_ids: number[]
  marked_at?: string
  marked: boolean
  retriable_at?: string
  created_at: string
  updated_at: string
}

export type Project = {
  id: number
  name: string
  slug: string
  parent_id?: number
}

export type Achievement = {
  id: number
  name: string
  description: string
  tier: string
  kind: string
  visible: boolean
  image?: string
  nbr_of_success?: number
  users_url: string
  parent?: Achievement
  achievements: string[]
}

export type Title = {
  id: number
  /**
   * Substituting the string corresponding to `%login` and using it.
   */
  name: string
}

export type TitleUser = {
  id: number
  user_id: number
  title_id: number
  selected: boolean
  created_at: string
  updated_at: string
}

export type Campus = {
  id: number
  name: string
  time_zone: string
  language: Language & {
    created_at: string
    updated_at: string
  }
  users_count: number
  vogsphere_id?: number
  country: string
  address: string
  zip: string
  city: string
  website: string
  facebook: string
  twitter: string
  active: boolean
  email_extension?: string
  default_hidden_phone: boolean
}

export type Language = {
  id: number
  name: string
  identifier: string
}

export type CampusUser = {
  id: number
  user_id: number
  campus_id: number
  is_primary: boolean
  created_at: string
  updated_at: string
}

export type Coalition = {
  id: number
  name: string
  slug: string
  image_url: string
  cover_url?: string
  color: string
  score: number
  user_id: number
}

export type Get42OauthToken = {
  access_token: string
  expires_in: number
  created_at: number
}

// export const get42Skills = (params?: Partial<PageParams>) => {
//   return axiosClientFor42Pagenation<Skill[]>('/v2/skills', params)
// }

// export const get42Campus = (params?: Partial<PageParams>) => {
//   return axiosClientFor42Pagenation<Campus[]>('/v2/campus', params)
// }

// export const get42Languages = (params?: Partial<PageParams>) => {
//   return axiosClientFor42Pagenation<Language[]>('/v2/languages', params)
// }

// export const get42Cursus = (params?: Partial<PageParams>) =>
//   axiosClientFor42Pagenation<Cursus[]>('/v2/cursus', params)

// export const get42Achievements = (params?: Partial<PageParams>) =>
//   axiosClientFor42Pagenation<Achievement[]>('/v2/achievements', params)

// export const get42Coalitions = (params?: Partial<PageParams>) =>
//   axiosClientFor42Pagenation<Coalition[]>(`/v2/coalitions`, params)

// export const get42UserCoalition = async (id: string | number) =>
//   axiosClientFor42Pagenation<Coalition[]>(`/v2/users/${id}/coalitions`)
