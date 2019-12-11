import { User } from "../entities";
import { User as GraphUser } from "../generated/graphql";

/** Maps a user entity to the GraphQL representation. */
export const adaptUser = (user: User): GraphUser => ({
    ...user,
    id: user.id.toString()
});
