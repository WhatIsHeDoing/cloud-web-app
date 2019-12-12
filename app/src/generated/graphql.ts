export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mutation = {
  readonly __typename?: 'Mutation',
  readonly createUser: Maybe<User>,
  /** Will return null if the user does not exist. */
  readonly deleteUser: Maybe<User>,
  /** Warning: deletes all users! */
  readonly deleteUsers: ReadonlyArray<User>,
  readonly updateUser: Maybe<User>,
  /** 
 * Finds details of the symbol, or a list of potential symbols from Alpha Vantage.
   * Mutates as it will cache an uncached, exact-matching symbol, for faster retrieval next time.
 */
  readonly searchSymbol: SearchSymbolResult,
};


export type MutationCreateUserArgs = {
  firstName: Scalars['String'],
  lastName: Scalars['String']
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'],
  patch: UserPatch
};


export type MutationSearchSymbolArgs = {
  symbol: Scalars['String']
};

export type NewsArticle = {
  readonly __typename?: 'NewsArticle',
  readonly id: Scalars['String'],
  /** Approximate time to read. */
  readonly minutesToRead: Scalars['Int'],
  readonly sectionName: Scalars['String'],
  readonly summary: Scalars['String'],
  readonly thumbnailUrl: Scalars['String'],
  readonly url: Scalars['String'],
  readonly webPublicationDate: Scalars['String'],
  readonly webTitle: Scalars['String'],
};

export type PossibleSymbol = {
  readonly __typename?: 'PossibleSymbol',
  readonly currency: Scalars['String'],
  readonly marketClose: Scalars['String'],
  readonly marketOpen: Scalars['String'],
  readonly matchScore: Scalars['Float'],
  readonly name: Scalars['String'],
  readonly region: Scalars['String'],
  readonly symbol: Scalars['String'],
  readonly timezone: Scalars['String'],
  readonly type: Scalars['String'],
};

export type PossibleSymbols = {
  readonly __typename?: 'PossibleSymbols',
  readonly symbols: ReadonlyArray<PossibleSymbol>,
};

export type Query = {
  readonly __typename?: 'Query',
  /** Defaults to ten business results, ordered by publication date. */
  readonly searchNews: ReadonlyArray<NewsArticle>,
  /** Time series of a symbol by the minute, ordered by timestamp descending. */
  readonly symbolTimeSeries: ReadonlyArray<SymbolTimeSeries>,
  readonly users: ReadonlyArray<User>,
};


export type QuerySearchNewsArgs = {
  keywords: ReadonlyArray<Scalars['String']>,
  numberOfResults: Maybe<Scalars['Int']>
};


export type QuerySymbolTimeSeriesArgs = {
  symbol: Scalars['String']
};

export type SearchSymbolResult = Symbol | PossibleSymbols;

export type Subscription = {
  readonly __typename?: 'Subscription',
  readonly userUpdated: UserSubscription,
};

export enum SubscriptionUpdateType {
  Create = 'CREATE',
  Update = 'UPDATE',
  Delete = 'DELETE'
}

export type Symbol = {
  readonly __typename?: 'Symbol',
  readonly currency: Scalars['String'],
  readonly marketClose: Scalars['String'],
  readonly marketOpen: Scalars['String'],
  readonly name: Scalars['String'],
  readonly region: Scalars['String'],
  readonly symbol: Scalars['String'],
  readonly timezone: Scalars['String'],
  readonly type: Scalars['String'],
};

export type SymbolTimeSeries = {
  readonly __typename?: 'SymbolTimeSeries',
  readonly close: Scalars['Float'],
  readonly high: Scalars['Float'],
  readonly low: Scalars['Float'],
  readonly open: Scalars['Float'],
  readonly timestamp: Scalars['String'],
  readonly volume: Scalars['Int'],
};

export type User = {
  readonly __typename?: 'User',
  readonly id: Scalars['String'],
  readonly firstName: Scalars['String'],
  readonly lastName: Scalars['String'],
};

/** All fields are optional, the ID is deliberately omitted. */
export type UserPatch = {
  readonly firstName: Maybe<Scalars['String']>,
  readonly lastName: Maybe<Scalars['String']>,
};

export type UserSubscription = {
  readonly __typename?: 'UserSubscription',
  readonly updateType: SubscriptionUpdateType,
  readonly user: User,
};
