// NOTE: UserApi is unfinished

import {
  type UserDto,
  type AuthenticationResult,
  type UserPolicy,
} from "@jellyfin/sdk/lib/generated-client/models";

import { BaseApi } from "./BaseApi";
import { RequestBuilder } from "../RequestBuilder";

type UsersRequestType = {
  isHidden?: boolean;
  isDisabled?: boolean;
};

export class UserApi extends BaseApi {
  /**
   * Authenticates a user by username and password.
   *
   * This is the primary login method. On success, it returns an
   * `AuthenticationResult` which includes the `AccessToken`. This token must be
   * used in the `Authorization` header for all future API calls.
   *
   * @param username
   * - The username of the user.
   * @param password
   * - The password of the user.
   * @returns {Promise<AuthenticationResult>}
   * The authentication result containing the user profile and session token.
   */
  public authenticateByName(username: string, password: string) {
    return new RequestBuilder<AuthenticationResult>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Users/AuthenticateByName")
      .withBody({ Username: username, Pw: password })
      .build();
  }

  /**
   * Retrieves a list of all users based on optional filter criteria.
   *
   * This method allows fetching the list of users with the ability to filter by
   * hidden or disabled status via the parameters object.
   *
   * @param parameters  Optional filters to refine the user list.
   * @returns {Promise<UserDto>} A promise that resolves to the user data.
   */
  public getUsers(parameters?: UsersRequestType) {
    return new RequestBuilder<UserDto[]>(this.configuration)
      .withEndpoint("/Users")
      .withParameters(parameters)
      .build();
  }

  /**
   * Retrieves a user by their unique id.
   *
   * @param id  The unique id of the user to retrieve.
   * @returns {Promise<UserDto>} A promise that resolves to the user data.
   */
  public getUser(id: string) {
    return new RequestBuilder<UserDto>(this.configuration)
      .withEndpoint(`/Users/${id}`)
      .build();
  }

  /**
   * Creates a new user.
   *
   * @param username  The username for the new user.
   * @param password  The optional password for the new user.
   * @returns {Promise<UserDto>} A promise that resolves to the newly created
   *                             user.
   */
  public createUser(username: string, password?: string) {
    return new RequestBuilder<UserDto>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Users/New")
      .withBody({ Name: username, Password: password })
      .build();
  }

  /**
   * Updates an existing user.
   *
   * @param user  The user data to update. The user's unique id must be set.
   * @returns {Promise<void>} A promise that resolves when the user is
   *                          updated.
   */
  public updateUser(user: UserDto) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint("/Users")
      .withParameters({ userId: user.Id })
      .withBody(user)
      .build();
  }

  /**
   * Updates a user's policy.
   *
   * @param id      The unique id of the user whose policy to update.
   * @param policy  The policy data to update.
   * @returns {Promise<void>} A promise that resolves when the policy is
   *                          updated.
   */
  public updateUserPolicy(id: string, policy: UserPolicy) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("POST")
      .withEndpoint(`/Users/${id}/Policy`)
      .withBody(policy)
      .build();
  }

  /**
   * Deletes a user by their unique id.
   *
   * @param id  The unique id of the user to delete.
   * @returns {Promise<void>} A promise that resolves when the user is
   *                          deleted.
   */
  public deleteUser(id: string) {
    return new RequestBuilder<void>(this.configuration)
      .withMethod("DELETE")
      .withEndpoint(`/Users/${id}`)
      .build();
  }

  /**
   * Retrieves a list of publicly visible users for display on a login screen.
   *
   * This endpoint provides a list of users who are marked as publicly visible.
   * It is commonly used to populate a user selection grid or list during the
   * initial sign in process.
   *
   * @returns {Promise<UserDto[]>} A promise that resolves to an array of
   *                               public user objects.
   */
  public getPublicUsers() {
    return new RequestBuilder<UserDto[]>(this.configuration)
      .withEndpoint("/Users/Public")
      .build();
  }
}
