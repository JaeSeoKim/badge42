export type UserBase = {
  id: number
  email: string
  login: string
  first_name: string | null
  last_name: string | null
  usual_full_name: string | null
  usual_first_name: string | null
  url: string
  phone: string
  displayname: string
  /**
   * TODO: 'alumni', 'staff'로 오는 것이 맞는지 확인하기..!
   */
  kind: 'student' | 'alumni' | 'staff' | string
  image: {
    link: string
    versions: {
      large: string
      medium: string
      small: string
      micro: string
    }
  }
  'staff?': boolean
  correction_point: number
  pool_month: string
  pool_year: string
  location: null | unknown
  wallet: string
  anonymize_date: string
  data_erasure_date: string
  created_at: string
  updated_at: string
  alumnized_at: string | null
  'alumni?': boolean
  'active?': boolean

  titles: Title[]
  titles_users: TitlesUser[]
  partnerships: unknown[]
  patroned: unknown[]
  patroning: unknown[]
  expertises_users: ExpertisesUser[]
  roles: unknown[]
  campus: Campus[]
  campus_users: CampusUser[]
}

export type Title = {
  id: number
  /**
   * you should using it after replace `%login` to login(ex. jaeskim)
   *
   * @example 'Philanthropist %login' -> 'Philanthropist jaeskim'
   */
  name: string
}

export type TitlesUser = {
  id: number
  user_id: number
  title_id: number
  selected: boolean
  created_at: boolean
  updated_at: boolean
}

export type ExpertisesUser = {
  id: number
  expertise_id: number
  interested: boolean
  value: number
  contact_me: boolean
  created_at: string
  user_id: boolean
}

export type CampusUser = {
  id: number
  user_id: number
  campus_id: number
  is_primary: boolean
  created_at: string
  updated_at: string
}

export type Campus = {
  id: number
  name: string
  time_zone: string
  language: {
    id: number
    name: string
    identifier: string
    created_at: string
    updated_at: string
  }
  users_count: number
  vogsphere_id: number
  country: string
  address: string
  zip: string
  city: string
  website: string
  facebook: string
  twitter: string
  active: boolean
  public: boolean
  email_extension: string
  default_hidden_phone: boolean
}
