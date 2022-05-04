// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

/*
This file is auto-generated
Do not make direct changes to this file
*/

import { rest, stream, paginate, RequestOptions } from "../request";
import {
  AuthClient,
  TwitterResponse,
  TwitterBody,
  TwitterParams,
  TwitterPaginatedResponse,
} from "../types";
import { OAuth2Bearer } from "../auth";

import {
  findUsersById,
  findUserById,
  findUsersByUsername,
  findMyUser,
  findUserByUsername,
  usersIdBlock,
  usersIdBlocking,
  usersIdUnblock,
  getUsersIdBookmarks,
  postUsersIdBookmarks,
  usersIdBookmarksDelete,
  usersIdUnmute,
  usersIdMute,
  usersIdMuting,
  usersIdFollowers,
  usersIdFollowing,
  usersIdFollow,
  usersIdUnfollow,
  userFollowedLists,
  listUserFollow,
  listUserUnfollow,
  getUserListMemberships,
  listUserOwnedLists,
  listUserPinnedLists,
  listUserPin,
  listUserUnpin,
  findTweetsById,
  createTweet,
  findTweetById,
  deleteTweetById,
  findTweetsThatQuoteATweet,
  hideReplyById,
  tweetsRecentSearch,
  tweetsFullarchiveSearch,
  searchStream,
  getRules,
  addOrDeleteRules,
  sampleStream,
  getOpenApiSpec,
  usersIdTweets,
  usersIdMentions,
  usersIdLike,
  usersIdUnlike,
  usersIdLikedTweets,
  tweetsIdLikingUsers,
  tweetsIdRetweetingUsers,
  usersIdRetweets,
  usersIdUnretweets,
  tweetCountsRecentSearch,
  tweetCountsFullArchiveSearch,
  listBatchComplianceJobs,
  createBatchComplianceJob,
  getBatchComplianceJob,
  listIdCreate,
  listIdDelete,
  listIdUpdate,
  listIdGet,
  listGetFollowers,
  listAddMember,
  listGetMembers,
  listRemoveMember,
  listsIdTweets,
  findSpaceById,
  findSpacesByIds,
  findSpacesByCreatorIds,
  searchSpaces,
  spaceTweets,
  spaceBuyers,
} from "./openapi-types";
/**
 * Twitter API TypeScript Client
 *
 * TypeScript SDK for use with the Twitter API
 *
 */
export class Client {
  #auth: AuthClient;
  #defaultRequestOptions?: Partial<RequestOptions>;

  constructor(
    auth: string | AuthClient,
    requestOptions?: Partial<RequestOptions>
  ) {
    this.#auth = typeof auth === "string" ? new OAuth2Bearer(auth) : auth;
    this.#defaultRequestOptions = requestOptions;
  }

  /**
   * Bookmarks
   *
   * Endpoints related to retrieving, managing bookmarks of a user
   *
   * Find out more
   * https://developer.twitter.com/en/docs/twitter-api/bookmarks
   */
  public readonly bookmarks = {
    /**
		* Bookmarks by User
		*

		* Returns Tweet objects that have been bookmarked by the requesting user
		* @param id - The ID of the user for whom to return results
		* @param params - The params for getUsersIdBookmarks
		* @param request_options - Customize the options for this request
		*/
    getUsersIdBookmarks: (
      id: string,
      params: TwitterParams<getUsersIdBookmarks> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<getUsersIdBookmarks>> =>
      paginate<TwitterResponse<getUsersIdBookmarks>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/bookmarks`,
        params,
        method: "GET",
      }),

    /**
		* Add Tweet to Bookmarks
		*

		* Adds a Tweet (ID in the body) to the requesting user's (in the path) bookmarks
		* @param id - The ID of the user for whom to add bookmarks
		* @param request_body - The request_body for postUsersIdBookmarks
		* @param request_options - Customize the options for this request
		*/
    postUsersIdBookmarks: (
      id: string,
      request_body: TwitterBody<postUsersIdBookmarks>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<postUsersIdBookmarks>> =>
      rest<TwitterResponse<postUsersIdBookmarks>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/bookmarks`,
        request_body,
        method: "POST",
      }),

    /**
		* Remove a bookmarked Tweet
		*

		* Removes a Tweet from the requesting user's bookmarked Tweets.
		* @param id - The ID of the user whose bookmark is to be removed.
		* @param tweet_id - The ID of the tweet that the user is removing from bookmarks
		* @param request_options - Customize the options for this request
		*/
    usersIdBookmarksDelete: (
      id: string,
      tweet_id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdBookmarksDelete>> =>
      rest<TwitterResponse<usersIdBookmarksDelete>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/bookmarks/${tweet_id}`,
        method: "DELETE",
      }),
  };
  /**
   * Compliance
   *
   * Endpoints related to keeping Twitter data in your systems compliant
   *
   * Find out more
   * https://developer.twitter.com/en/docs/twitter-api/compliance/batch-tweet/introduction
   */
  public readonly compliance = {
    /**
		* List compliance jobs
		*

		* Returns recent compliance jobs for a given job type and optional job status
		* @param params - The params for listBatchComplianceJobs
		* @param request_options - Customize the options for this request
		*/
    listBatchComplianceJobs: (
      params: TwitterParams<listBatchComplianceJobs>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listBatchComplianceJobs>> =>
      rest<TwitterResponse<listBatchComplianceJobs>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/compliance/jobs`,
        params,
        method: "GET",
      }),

    /**
		* Create compliance job
		*

		* Creates a compliance for the given job type
		* @param request_body - The request_body for createBatchComplianceJob
		* @param request_options - Customize the options for this request
		*/
    createBatchComplianceJob: (
      request_body: TwitterBody<createBatchComplianceJob>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<createBatchComplianceJob>> =>
      rest<TwitterResponse<createBatchComplianceJob>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/compliance/jobs`,
        request_body,
        method: "POST",
      }),

    /**
		* Get compliance job
		*

		* Returns a single compliance job by ID
		* @param id - ID of the compliance job to retrieve.
		* @param request_options - Customize the options for this request
		*/
    getBatchComplianceJob: (
      id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<getBatchComplianceJob>> =>
      rest<TwitterResponse<getBatchComplianceJob>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/compliance/jobs/${id}`,
        method: "GET",
      }),
  };
  /**
   * General
   *
   * Miscellaneous endpoints for general API functionality
   *
   * Find out more
   * https://developer.twitter.com/en/docs/twitter-api
   */
  public readonly general = {
    /**
		* Returns the open api spec document.
		*

		* Full open api spec in JSON format. (See https://github.com/OAI/OpenAPI-Specification/blob/master/README.md)
		* @param request_options - Customize the options for this request
		*/
    getOpenApiSpec: (
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<getOpenApiSpec>> =>
      rest<TwitterResponse<getOpenApiSpec>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/openapi.json`,
        method: "GET",
      }),
  };
  /**
   * Lists
   *
   * Endpoints related to retrieving, managing Lists
   *
   * Find out more
   * https://developer.twitter.com/en/docs/twitter-api/lists
   */
  public readonly lists = {
    /**
		* Get User's Followed Lists
		*

		* Returns a user's followed Lists.
		* @param id - The ID of the user for whom to return results
		* @param params - The params for userFollowedLists
		* @param request_options - Customize the options for this request
		*/
    userFollowedLists: (
      id: string,
      params: TwitterParams<userFollowedLists> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<userFollowedLists>> =>
      paginate<TwitterResponse<userFollowedLists>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/followed_lists`,
        params,
        method: "GET",
      }),

    /**
		* Follow a List
		*

		* Causes a user to follow a List.
		* @param id - The ID of the authenticated source user that will follow the List
		* @param request_body - The request_body for listUserFollow
		* @param request_options - Customize the options for this request
		*/
    listUserFollow: (
      id: string,
      request_body: TwitterBody<listUserFollow>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listUserFollow>> =>
      rest<TwitterResponse<listUserFollow>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/followed_lists`,
        request_body,
        method: "POST",
      }),

    /**
		* Unfollow a List
		*

		* Causes a user to unfollow a List.
		* @param id - The ID of the authenticated source user that will unfollow the List
		* @param list_id - The ID of the List to unfollow
		* @param request_options - Customize the options for this request
		*/
    listUserUnfollow: (
      id: string,
      list_id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listUserUnfollow>> =>
      rest<TwitterResponse<listUserUnfollow>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/followed_lists/${list_id}`,
        method: "DELETE",
      }),

    /**
		* Get a User's List Memberships
		*

		* Get a User's List Memberships.
		* @param id - The ID of the user for whom to return results
		* @param params - The params for getUserListMemberships
		* @param request_options - Customize the options for this request
		*/
    getUserListMemberships: (
      id: string,
      params: TwitterParams<getUserListMemberships> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<getUserListMemberships>> =>
      paginate<TwitterResponse<getUserListMemberships>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/list_memberships`,
        params,
        method: "GET",
      }),

    /**
		* Get a User's Owned Lists
		*

		* Get a User's Owned Lists.
		* @param id - The ID of the user for whom to return results
		* @param params - The params for listUserOwnedLists
		* @param request_options - Customize the options for this request
		*/
    listUserOwnedLists: (
      id: string,
      params: TwitterParams<listUserOwnedLists> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<listUserOwnedLists>> =>
      paginate<TwitterResponse<listUserOwnedLists>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/owned_lists`,
        params,
        method: "GET",
      }),

    /**
		* Get a User's Pinned Lists
		*

		* Get a User's Pinned Lists.
		* @param id - The ID of the user for whom to return results
		* @param params - The params for listUserPinnedLists
		* @param request_options - Customize the options for this request
		*/
    listUserPinnedLists: (
      id: string,
      params: TwitterParams<listUserPinnedLists> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listUserPinnedLists>> =>
      rest<TwitterResponse<listUserPinnedLists>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/pinned_lists`,
        params,
        method: "GET",
      }),

    /**
		* Pin a List
		*

		* Causes a user to pin a List.
		* @param id - The ID of the authenticated source user that will pin the List
		* @param request_body - The request_body for listUserPin
		* @param request_options - Customize the options for this request
		*/
    listUserPin: (
      id: string,
      request_body: TwitterBody<listUserPin>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listUserPin>> =>
      rest<TwitterResponse<listUserPin>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/pinned_lists`,
        request_body,
        method: "POST",
      }),

    /**
		* Unpin a List
		*

		* Causes a user to remove a pinned List.
		* @param id - The ID of the authenticated source user that will remove the pinned List
		* @param list_id - The ID of the List to unpin
		* @param request_options - Customize the options for this request
		*/
    listUserUnpin: (
      id: string,
      list_id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listUserUnpin>> =>
      rest<TwitterResponse<listUserUnpin>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/pinned_lists/${list_id}`,
        method: "DELETE",
      }),

    /**
		* Create List
		*

		* Creates a new List.
		* @param request_body - The request_body for listIdCreate
		* @param request_options - Customize the options for this request
		*/
    listIdCreate: (
      request_body: TwitterBody<listIdCreate>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listIdCreate>> =>
      rest<TwitterResponse<listIdCreate>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/lists`,
        request_body,
        method: "POST",
      }),

    /**
		* Delete List
		*

		* Delete a List that you own.
		* @param id - The ID of the List to delete
		* @param request_options - Customize the options for this request
		*/
    listIdDelete: (
      id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listIdDelete>> =>
      rest<TwitterResponse<listIdDelete>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/lists/${id}`,
        method: "DELETE",
      }),

    /**
		* Update List
		*

		* Update a List that you own.
		* @param id - The ID of the List to modify
		* @param request_body - The request_body for listIdUpdate
		* @param request_options - Customize the options for this request
		*/
    listIdUpdate: (
      id: string,
      request_body: TwitterBody<listIdUpdate>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listIdUpdate>> =>
      rest<TwitterResponse<listIdUpdate>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/lists/${id}`,
        request_body,
        method: "PUT",
      }),

    /**
		* List lookup by List ID
		*

		* Returns a List
		* @param id - The ID of the List to get
		* @param params - The params for listIdGet
		* @param request_options - Customize the options for this request
		*/
    listIdGet: (
      id: string,
      params: TwitterParams<listIdGet> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listIdGet>> =>
      rest<TwitterResponse<listIdGet>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/lists/${id}`,
        params,
        method: "GET",
      }),

    /**
		* Add a List member
		*

		* Causes a user to become a member of a List.
		* @param id - The ID of the List to add a member
		* @param request_body - The request_body for listAddMember
		* @param request_options - Customize the options for this request
		*/
    listAddMember: (
      id: string,
      request_body: TwitterBody<listAddMember>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listAddMember>> =>
      rest<TwitterResponse<listAddMember>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/lists/${id}/members`,
        request_body,
        method: "POST",
      }),

    /**
		* Remove a List member
		*

		* Causes a user to be removed from the members of a List.
		* @param id - The ID of the List to remove a member
		* @param user_id - The ID of user that will be removed from the List
		* @param request_options - Customize the options for this request
		*/
    listRemoveMember: (
      id: string,
      user_id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<listRemoveMember>> =>
      rest<TwitterResponse<listRemoveMember>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/lists/${id}/members/${user_id}`,
        method: "DELETE",
      }),
  };
  /**
   * Spaces
   *
   * Endpoints related to retrieving, managing Spaces
   *
   * Find out more
   * https://developer.twitter.com/en/docs/twitter-api/spaces
   */
  public readonly spaces = {
    /**
		* Space lookup by Space ID
		*

		* Returns a variety of information about the Space specified by the requested ID
		* @param id - The space id to be retrieved
		* @param params - The params for findSpaceById
		* @param request_options - Customize the options for this request
		*/
    findSpaceById: (
      id: string,
      params: TwitterParams<findSpaceById> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findSpaceById>> =>
      rest<TwitterResponse<findSpaceById>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/spaces/${id}`,
        params,
        method: "GET",
      }),

    /**
		* Space lookup up Space IDs
		*

		* Returns a variety of information about the Spaces specified by the requested IDs
		* @param params - The params for findSpacesByIds
		* @param request_options - Customize the options for this request
		*/
    findSpacesByIds: (
      params: TwitterParams<findSpacesByIds>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findSpacesByIds>> =>
      rest<TwitterResponse<findSpacesByIds>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/spaces`,
        params,
        method: "GET",
      }),

    /**
		* Space lookup by their creators
		*

		* Returns a variety of information about the Spaces created by the provided User IDs
		* @param params - The params for findSpacesByCreatorIds
		* @param request_options - Customize the options for this request
		*/
    findSpacesByCreatorIds: (
      params: TwitterParams<findSpacesByCreatorIds>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findSpacesByCreatorIds>> =>
      rest<TwitterResponse<findSpacesByCreatorIds>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/spaces/by/creator_ids`,
        params,
        method: "GET",
      }),

    /**
		* Search for Spaces
		*

		* Returns Spaces that match the provided query.
		* @param params - The params for searchSpaces
		* @param request_options - Customize the options for this request
		*/
    searchSpaces: (
      params: TwitterParams<searchSpaces>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<searchSpaces>> =>
      rest<TwitterResponse<searchSpaces>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/spaces/search`,
        params,
        method: "GET",
      }),

    /**
		* Retrieve tweets from a Space
		*

		* Retrieves tweets shared in the specified space
		* @param id - The space id from which tweets will be retrieved
		* @param params - The params for spaceTweets
		* @param request_options - Customize the options for this request
		*/
    spaceTweets: (
      id: string,
      params: TwitterParams<spaceTweets> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<spaceTweets>> =>
      rest<TwitterResponse<spaceTweets>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/spaces/${id}/tweets`,
        params,
        method: "GET",
      }),

    /**
		* Retrieve the list of users who purchased a ticket to the given space
		*

		* Retrieves the list of users who purchased a ticket to the given space
		* @param id - The space id from which tweets will be retrieved
		* @param params - The params for spaceBuyers
		* @param request_options - Customize the options for this request
		*/
    spaceBuyers: (
      id: string,
      params: TwitterParams<spaceBuyers> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<spaceBuyers>> =>
      rest<TwitterResponse<spaceBuyers>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/spaces/${id}/buyers`,
        params,
        method: "GET",
      }),
  };
  /**
   * Tweets
   *
   * Endpoints related to retrieving, searching, and modifying Tweets
   *
   * Find out more
   * https://developer.twitter.com/en/docs/twitter-api/tweets/lookup
   */
  public readonly tweets = {
    /**
		* Tweet lookup by Tweet IDs
		*

		* Returns a variety of information about the Tweet specified by the requested ID.
		* @param params - The params for findTweetsById
		* @param request_options - Customize the options for this request
		*/
    findTweetsById: (
      params: TwitterParams<findTweetsById>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findTweetsById>> =>
      rest<TwitterResponse<findTweetsById>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets`,
        params,
        method: "GET",
      }),

    /**
		* Creation of a Tweet
		*

		* Causes the user to create a tweet under the authorized account.
		* @param request_body - The request_body for createTweet
		* @param request_options - Customize the options for this request
		*/
    createTweet: (
      request_body: TwitterBody<createTweet>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<createTweet>> =>
      rest<TwitterResponse<createTweet>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets`,
        request_body,
        method: "POST",
      }),

    /**
		* Tweet lookup by Tweet ID
		*

		* Returns a variety of information about the Tweet specified by the requested ID.
		* @param id - A single Tweet ID.
		* @param params - The params for findTweetById
		* @param request_options - Customize the options for this request
		*/
    findTweetById: (
      id: string,
      params: TwitterParams<findTweetById> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findTweetById>> =>
      rest<TwitterResponse<findTweetById>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/${id}`,
        params,
        method: "GET",
      }),

    /**
		* Tweet delete by Tweet ID
		*

		* Delete specified Tweet (in the path) by ID.
		* @param id - The ID of the Tweet to be deleted.
		* @param request_options - Customize the options for this request
		*/
    deleteTweetById: (
      id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<deleteTweetById>> =>
      rest<TwitterResponse<deleteTweetById>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/${id}`,
        method: "DELETE",
      }),

    /**
		* Retrieve tweets that quote a tweet.
		*

		* Returns a variety of information about each tweet that quotes the Tweet specified by the requested ID.
		* @param id - The ID of the Quoted Tweet.
		* @param params - The params for findTweetsThatQuoteATweet
		* @param request_options - Customize the options for this request
		*/
    findTweetsThatQuoteATweet: (
      id: string,
      params: TwitterParams<findTweetsThatQuoteATweet> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findTweetsThatQuoteATweet>> =>
      rest<TwitterResponse<findTweetsThatQuoteATweet>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/${id}/quote_tweets`,
        params,
        method: "GET",
      }),

    /**
		* Hide replies
		*

		* Hides or unhides a reply to an owned conversation.
		* @param id - The ID of the reply that you want to hide or unhide.
		* @param request_body - The request_body for hideReplyById
		* @param request_options - Customize the options for this request
		*/
    hideReplyById: (
      id: string,
      request_body: TwitterBody<hideReplyById>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<hideReplyById>> =>
      rest<TwitterResponse<hideReplyById>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/${id}/hidden`,
        request_body,
        method: "PUT",
      }),

    /**
		* Recent search
		*

		* Returns Tweets from the last 7 days that match a search query.
		* @param params - The params for tweetsRecentSearch
		* @param request_options - Customize the options for this request
		*/
    tweetsRecentSearch: (
      params: TwitterParams<tweetsRecentSearch>,
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<tweetsRecentSearch>> =>
      paginate<TwitterResponse<tweetsRecentSearch>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/search/recent`,
        params,
        method: "GET",
      }),

    /**
		* Full-archive search
		*

		* Returns Tweets that match a search query.
		* @param params - The params for tweetsFullarchiveSearch
		* @param request_options - Customize the options for this request
		*/
    tweetsFullarchiveSearch: (
      params: TwitterParams<tweetsFullarchiveSearch>,
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<tweetsFullarchiveSearch>> =>
      paginate<TwitterResponse<tweetsFullarchiveSearch>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/search/all`,
        params,
        method: "GET",
      }),

    /**
		* Filtered stream
		*

		* Streams Tweets matching the stream's active rule set.
		* @param params - The params for searchStream
		* @param request_options - Customize the options for this request
		*/
    searchStream: (
      params: TwitterParams<searchStream> = {},
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<searchStream>> =>
      stream<TwitterResponse<searchStream>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/search/stream`,
        params,
        method: "GET",
      }),

    /**
		* Rules lookup
		*

		* Returns rules from a user's active rule set. Users can fetch all of their rules or a subset, specified by the provided rule ids.
		* @param params - The params for getRules
		* @param request_options - Customize the options for this request
		*/
    getRules: (
      params: TwitterParams<getRules> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<getRules>> =>
      paginate<TwitterResponse<getRules>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/search/stream/rules`,
        params,
        method: "GET",
      }),

    /**
		* Add/Delete rules
		*

		* Add or delete rules from a user's active rule set. Users can provide unique, optionally tagged rules to add. Users can delete their entire rule set or a subset specified by rule ids or values.
		* @param params - The params for addOrDeleteRules
		* @param request_body - The request_body for addOrDeleteRules
		* @param request_options - Customize the options for this request
		*/
    addOrDeleteRules: (
      request_body: TwitterBody<addOrDeleteRules>,
      params: TwitterParams<addOrDeleteRules> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<addOrDeleteRules>> =>
      rest<TwitterResponse<addOrDeleteRules>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/search/stream/rules`,
        params,
        request_body,
        method: "POST",
      }),

    /**
		* Sample stream
		*

		* Streams a deterministic 1% of public Tweets.
		* @param params - The params for sampleStream
		* @param request_options - Customize the options for this request
		*/
    sampleStream: (
      params: TwitterParams<sampleStream> = {},
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<sampleStream>> =>
      stream<TwitterResponse<sampleStream>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/sample/stream`,
        params,
        method: "GET",
      }),

    /**
		* User Tweets timeline by User ID
		*

		* Returns a list of Tweets authored by the provided User ID
		* @param id - The ID of the User to list Tweets of
		* @param params - The params for usersIdTweets
		* @param request_options - Customize the options for this request
		*/
    usersIdTweets: (
      id: string,
      params: TwitterParams<usersIdTweets> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<usersIdTweets>> =>
      paginate<TwitterResponse<usersIdTweets>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/tweets`,
        params,
        method: "GET",
      }),

    /**
		* User mention timeline by User ID
		*

		* Returns Tweet objects that mention username associated to the provided User ID
		* @param id - The ID of the User to list mentions of
		* @param params - The params for usersIdMentions
		* @param request_options - Customize the options for this request
		*/
    usersIdMentions: (
      id: string,
      params: TwitterParams<usersIdMentions> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<usersIdMentions>> =>
      paginate<TwitterResponse<usersIdMentions>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/mentions`,
        params,
        method: "GET",
      }),

    /**
		* Causes the user (in the path) to like the specified tweet
		*

		* Causes the user (in the path) to like the specified tweet. The user in the path must match the user context authorizing the request.
		* @param id - The ID of the user that is requesting to like the tweet
		* @param request_body - The request_body for usersIdLike
		* @param request_options - Customize the options for this request
		*/
    usersIdLike: (
      id: string,
      request_body: TwitterBody<usersIdLike>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdLike>> =>
      rest<TwitterResponse<usersIdLike>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/likes`,
        request_body,
        method: "POST",
      }),

    /**
		* Causes the user (in the path) to unlike the specified tweet
		*

		* Causes the user (in the path) to unlike the specified tweet. The user must match the user context authorizing the request
		* @param id - The ID of the user that is requesting to unlike the tweet
		* @param tweet_id - The ID of the tweet that the user is requesting to unlike
		* @param request_options - Customize the options for this request
		*/
    usersIdUnlike: (
      id: string,
      tweet_id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdUnlike>> =>
      rest<TwitterResponse<usersIdUnlike>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/likes/${tweet_id}`,
        method: "DELETE",
      }),

    /**
		* Returns Tweet objects liked by the provided User ID
		*

		* Returns a list of Tweets liked by the provided User ID
		* @param id - The ID of the User to list the liked Tweets of
		* @param params - The params for usersIdLikedTweets
		* @param request_options - Customize the options for this request
		*/
    usersIdLikedTweets: (
      id: string,
      params: TwitterParams<usersIdLikedTweets> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<usersIdLikedTweets>> =>
      paginate<TwitterResponse<usersIdLikedTweets>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/liked_tweets`,
        params,
        method: "GET",
      }),

    /**
		* Causes the user (in the path) to retweet the specified tweet
		*

		* Causes the user (in the path) to retweet the specified tweet. The user in the path must match the user context authorizing the request.
		* @param id - The ID of the user that is requesting to retweet the tweet
		* @param request_body - The request_body for usersIdRetweets
		* @param request_options - Customize the options for this request
		*/
    usersIdRetweets: (
      id: string,
      request_body: TwitterBody<usersIdRetweets>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdRetweets>> =>
      rest<TwitterResponse<usersIdRetweets>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/retweets`,
        request_body,
        method: "POST",
      }),

    /**
		* Causes the user (in the path) to unretweet the specified tweet
		*

		* Causes the user (in the path) to unretweet the specified tweet. The user must match the user context authorizing the request
		* @param id - The ID of the user that is requesting to unretweet the tweet
		* @param source_tweet_id - The ID of the tweet that the user is requesting to unretweet
		* @param request_options - Customize the options for this request
		*/
    usersIdUnretweets: (
      id: string,
      source_tweet_id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdUnretweets>> =>
      rest<TwitterResponse<usersIdUnretweets>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/retweets/${source_tweet_id}`,
        method: "DELETE",
      }),

    /**
		* Recent search counts
		*

		* Returns Tweet Counts from the last 7 days that match a search query.
		* @param params - The params for tweetCountsRecentSearch
		* @param request_options - Customize the options for this request
		*/
    tweetCountsRecentSearch: (
      params: TwitterParams<tweetCountsRecentSearch>,
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<tweetCountsRecentSearch>> =>
      paginate<TwitterResponse<tweetCountsRecentSearch>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/counts/recent`,
        params,
        method: "GET",
      }),

    /**
		* Full archive search counts
		*

		* Returns Tweet Counts that match a search query.
		* @param params - The params for tweetCountsFullArchiveSearch
		* @param request_options - Customize the options for this request
		*/
    tweetCountsFullArchiveSearch: (
      params: TwitterParams<tweetCountsFullArchiveSearch>,
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<
      TwitterResponse<tweetCountsFullArchiveSearch>
    > =>
      paginate<TwitterResponse<tweetCountsFullArchiveSearch>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/counts/all`,
        params,
        method: "GET",
      }),

    /**
		* List Tweets timeline by List ID
		*

		* Returns a list of Tweets associated with the provided List ID
		* @param id - The ID of the List to list Tweets of
		* @param params - The params for listsIdTweets
		* @param request_options - Customize the options for this request
		*/
    listsIdTweets: (
      id: string,
      params: TwitterParams<listsIdTweets> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<listsIdTweets>> =>
      paginate<TwitterResponse<listsIdTweets>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/lists/${id}/tweets`,
        params,
        method: "GET",
      }),
  };
  /**
   * Users
   *
   * Endpoints related to retrieving, managing relationships of Users
   *
   * Find out more
   * https://developer.twitter.com/en/docs/twitter-api/users/lookup
   */
  public readonly users = {
    /**
		* User lookup by IDs
		*

		* This endpoint returns information about users. Specify users by their ID.
		* @param params - The params for findUsersById
		* @param request_options - Customize the options for this request
		*/
    findUsersById: (
      params: TwitterParams<findUsersById>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findUsersById>> =>
      rest<TwitterResponse<findUsersById>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users`,
        params,
        method: "GET",
      }),

    /**
		* User lookup by ID
		*

		* This endpoint returns information about a user. Specify user by ID.
		* @param id - Required. A User ID.
		* @param params - The params for findUserById
		* @param request_options - Customize the options for this request
		*/
    findUserById: (
      id: string,
      params: TwitterParams<findUserById> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findUserById>> =>
      rest<TwitterResponse<findUserById>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}`,
        params,
        method: "GET",
      }),

    /**
		* User lookup by usernames
		*

		* This endpoint returns information about users. Specify users by their username.
		* @param params - The params for findUsersByUsername
		* @param request_options - Customize the options for this request
		*/
    findUsersByUsername: (
      params: TwitterParams<findUsersByUsername>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findUsersByUsername>> =>
      rest<TwitterResponse<findUsersByUsername>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/by`,
        params,
        method: "GET",
      }),

    /**
		* User lookup me
		*

		* This endpoint returns information about the requesting user.
		* @param params - The params for findMyUser
		* @param request_options - Customize the options for this request
		*/
    findMyUser: (
      params: TwitterParams<findMyUser> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findMyUser>> =>
      rest<TwitterResponse<findMyUser>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/me`,
        params,
        method: "GET",
      }),

    /**
		* User lookup by username
		*

		* This endpoint returns information about a user. Specify user by username.
		* @param username - Required. A username.
		* @param params - The params for findUserByUsername
		* @param request_options - Customize the options for this request
		*/
    findUserByUsername: (
      username: string,
      params: TwitterParams<findUserByUsername> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<findUserByUsername>> =>
      rest<TwitterResponse<findUserByUsername>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/by/username/${username}`,
        params,
        method: "GET",
      }),

    /**
		* Block User by User ID
		*

		* Causes the user (in the path) to block the target user. The user (in the path) must match the user context authorizing the request
		* @param id - The ID of the user that is requesting to block the target user
		* @param request_body - The request_body for usersIdBlock
		* @param request_options - Customize the options for this request
		*/
    usersIdBlock: (
      id: string,
      request_body: TwitterBody<usersIdBlock>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdBlock>> =>
      rest<TwitterResponse<usersIdBlock>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/blocking`,
        request_body,
        method: "POST",
      }),

    /**
		* Returns user objects that are blocked by provided user ID
		*

		* Returns a list of users that are blocked by the provided user ID
		* @param id - The ID of the user for whom to return results
		* @param params - The params for usersIdBlocking
		* @param request_options - Customize the options for this request
		*/
    usersIdBlocking: (
      id: string,
      params: TwitterParams<usersIdBlocking> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<usersIdBlocking>> =>
      paginate<TwitterResponse<usersIdBlocking>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/blocking`,
        params,
        method: "GET",
      }),

    /**
		* Unblock User by User ID
		*

		* Causes the source user to unblock the target user. The source user must match the user context authorizing the request
		* @param source_user_id - The ID of the user that is requesting to unblock the target user
		* @param target_user_id - The ID of the user that the source user is requesting to unblock
		* @param request_options - Customize the options for this request
		*/
    usersIdUnblock: (
      source_user_id: string,
      target_user_id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdUnblock>> =>
      rest<TwitterResponse<usersIdUnblock>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${source_user_id}/blocking/${target_user_id}`,
        method: "DELETE",
      }),

    /**
		* Unmute User by User ID
		*

		* Causes the source user to unmute the target user. The source user must match the user context authorizing the request
		* @param source_user_id - The ID of the user that is requesting to unmute the target user
		* @param target_user_id - The ID of the user that the source user is requesting to unmute
		* @param request_options - Customize the options for this request
		*/
    usersIdUnmute: (
      source_user_id: string,
      target_user_id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdUnmute>> =>
      rest<TwitterResponse<usersIdUnmute>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${source_user_id}/muting/${target_user_id}`,
        method: "DELETE",
      }),

    /**
		* Mute User by User ID
		*

		* Causes the user (in the path) to mute the target user. The user (in the path) must match the user context authorizing the request
		* @param id - The ID of the user that is requesting to mute the target user
		* @param request_body - The request_body for usersIdMute
		* @param request_options - Customize the options for this request
		*/
    usersIdMute: (
      id: string,
      request_body: TwitterBody<usersIdMute>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdMute>> =>
      rest<TwitterResponse<usersIdMute>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/muting`,
        request_body,
        method: "POST",
      }),

    /**
		* Returns user objects that are muted by the provided user ID
		*

		* Returns a list of users that are muted by the provided user ID
		* @param id - The ID of the user for whom to return results
		* @param params - The params for usersIdMuting
		* @param request_options - Customize the options for this request
		*/
    usersIdMuting: (
      id: string,
      params: TwitterParams<usersIdMuting> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<usersIdMuting>> =>
      paginate<TwitterResponse<usersIdMuting>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/muting`,
        params,
        method: "GET",
      }),

    /**
		* Returns user objects that follow the provided user ID
		*

		* Returns a list of users that follow the provided user ID
		* @param id - The ID of the user for whom to return results
		* @param params - The params for usersIdFollowers
		* @param request_options - Customize the options for this request
		*/
    usersIdFollowers: (
      id: string,
      params: TwitterParams<usersIdFollowers> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<usersIdFollowers>> =>
      paginate<TwitterResponse<usersIdFollowers>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/followers`,
        params,
        method: "GET",
      }),

    /**
		* Following by User ID
		*

		* Returns a list of users that are being followed by the provided user ID
		* @param id - The ID of the user for whom to return results
		* @param params - The params for usersIdFollowing
		* @param request_options - Customize the options for this request
		*/
    usersIdFollowing: (
      id: string,
      params: TwitterParams<usersIdFollowing> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<usersIdFollowing>> =>
      paginate<TwitterResponse<usersIdFollowing>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/following`,
        params,
        method: "GET",
      }),

    /**
		* Follow User
		*

		* Causes the user(in the path) to follow, or “request to follow” for protected users, the target user. The user(in the path) must match the user context authorizing the request
		* @param id - The ID of the user that is requesting to follow the target user
		* @param request_body - The request_body for usersIdFollow
		* @param request_options - Customize the options for this request
		*/
    usersIdFollow: (
      id: string,
      request_body: TwitterBody<usersIdFollow>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdFollow>> =>
      rest<TwitterResponse<usersIdFollow>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/following`,
        request_body,
        method: "POST",
      }),

    /**
		* Unfollow User
		*

		* Causes the source user to unfollow the target user. The source user must match the user context authorizing the request
		* @param source_user_id - The ID of the user that is requesting to unfollow the target user
		* @param target_user_id - The ID of the user that the source user is requesting to unfollow
		* @param request_options - Customize the options for this request
		*/
    usersIdUnfollow: (
      source_user_id: string,
      target_user_id: string,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<usersIdUnfollow>> =>
      rest<TwitterResponse<usersIdUnfollow>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${source_user_id}/following/${target_user_id}`,
        method: "DELETE",
      }),

    /**
		* Returns user objects that have liked the provided Tweet ID
		*

		* Returns a list of users that have liked the provided Tweet ID
		* @param id - The ID of the Tweet for which to return results
		* @param params - The params for tweetsIdLikingUsers
		* @param request_options - Customize the options for this request
		*/
    tweetsIdLikingUsers: (
      id: string,
      params: TwitterParams<tweetsIdLikingUsers> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<tweetsIdLikingUsers>> =>
      paginate<TwitterResponse<tweetsIdLikingUsers>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/${id}/liking_users`,
        params,
        method: "GET",
      }),

    /**
		* Returns user objects that have retweeted the provided Tweet ID
		*

		* Returns a list of users that have retweeted the provided Tweet ID
		* @param id - The ID of the Tweet for which to return results
		* @param params - The params for tweetsIdRetweetingUsers
		* @param request_options - Customize the options for this request
		*/
    tweetsIdRetweetingUsers: (
      id: string,
      params: TwitterParams<tweetsIdRetweetingUsers> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<tweetsIdRetweetingUsers>> =>
      paginate<TwitterResponse<tweetsIdRetweetingUsers>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/${id}/retweeted_by`,
        params,
        method: "GET",
      }),

    /**
		* Returns user objects that follow a List by the provided List ID
		*

		* Returns a list of users that follow a List by the provided List ID
		* @param id - The ID of the List for which to return followers
		* @param params - The params for listGetFollowers
		* @param request_options - Customize the options for this request
		*/
    listGetFollowers: (
      id: string,
      params: TwitterParams<listGetFollowers> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<listGetFollowers>> =>
      paginate<TwitterResponse<listGetFollowers>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/lists/${id}/followers`,
        params,
        method: "GET",
      }),

    /**
		* Returns user objects that are members of a List by the provided List ID
		*

		* Returns a list of users that are members of a List by the provided List ID
		* @param id - The ID of the List for which to return members
		* @param params - The params for listGetMembers
		* @param request_options - Customize the options for this request
		*/
    listGetMembers: (
      id: string,
      params: TwitterParams<listGetMembers> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<listGetMembers>> =>
      paginate<TwitterResponse<listGetMembers>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/lists/${id}/members`,
        params,
        method: "GET",
      }),
  };
}
