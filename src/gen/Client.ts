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
  listBatchComplianceJobs,
  createBatchComplianceJob,
  getBatchComplianceJob,
  dmConversationIdCreate,
  getDmConversationsWithParticipantIdDmEvents,
  dmConversationWithUserEventIdCreate,
  dmConversationByIdEventIdCreate,
  getDmConversationsIdDmEvents,
  getDmEvents,
  listIdCreate,
  listIdDelete,
  listIdGet,
  listIdUpdate,
  listGetFollowers,
  listGetMembers,
  listAddMember,
  listRemoveMember,
  listsIdTweets,
  getOpenApiSpec,
  findSpacesByIds,
  findSpacesByCreatorIds,
  searchSpaces,
  findSpaceById,
  spaceBuyers,
  spaceTweets,
  getTrends,
  findTweetsById,
  createTweet,
  getTweetsComplianceStream,
  tweetCountsFullArchiveSearch,
  tweetCountsRecentSearch,
  getTweetsFirehoseStream,
  getTweetsFirehoseStreamLangEn,
  getTweetsFirehoseStreamLangJa,
  getTweetsFirehoseStreamLangKo,
  getTweetsFirehoseStreamLangPt,
  getTweetsLabelStream,
  sampleStream,
  getTweetsSample10Stream,
  tweetsFullarchiveSearch,
  tweetsRecentSearch,
  searchStream,
  getRules,
  addOrDeleteRules,
  getRuleCount,
  deleteTweetById,
  findTweetById,
  tweetsIdLikingUsers,
  findTweetsThatQuoteATweet,
  tweetsIdRetweetingUsers,
  findTweetsThatRetweetATweet,
  hideReplyById,
  getUsageTweets,
  findUsersById,
  findUsersByUsername,
  findUserByUsername,
  getUsersComplianceStream,
  findMyUser,
  searchUserByQuery,
  findUserById,
  usersIdBlocking,
  getUsersIdBookmarks,
  postUsersIdBookmarks,
  usersIdBookmarksDelete,
  userFollowedLists,
  listUserFollow,
  listUserUnfollow,
  usersIdFollowers,
  usersIdFollowing,
  usersIdFollow,
  usersIdLikedTweets,
  usersIdLike,
  usersIdUnlike,
  getUserListMemberships,
  usersIdMentions,
  usersIdMuting,
  usersIdMute,
  listUserOwnedLists,
  listUserPinnedLists,
  listUserPin,
  listUserUnpin,
  usersIdRetweets,
  usersIdUnretweets,
  usersIdTimeline,
  usersIdTweets,
  usersIdUnfollow,
  usersIdUnmute,
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
  version: string;
  twitterApiOpenApiVersion: string;

  constructor(
    auth: string | AuthClient,
    requestOptions?: Partial<RequestOptions>
  ) {
    this.version = "undefined";
    this.twitterApiOpenApiVersion = "2.88";
    this.#auth = typeof auth === "string" ? new OAuth2Bearer(auth) : auth;
    this.#defaultRequestOptions = {
      ...requestOptions,
      headers: {
        "User-Agent": "twitter-api-typescript-sdk/" + this.version,
        ...requestOptions?.headers,
      },
    };
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

    * Returns Post objects that have been bookmarked by the requesting User
    * @param id - The ID of the authenticated source User for whom to return results.
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
    * Add Post to Bookmarks
    *

    * Adds a Post (ID in the body) to the requesting User's (in the path) bookmarks
    * @param id - The ID of the authenticated source User for whom to add bookmarks.
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
    * Remove a bookmarked Post
    *

    * Removes a Post from the requesting User's bookmarked Posts.
    * @param id - The ID of the authenticated source User whose bookmark is to be removed.
    * @param tweet_id - The ID of the Post that the source User is removing from bookmarks.
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
   * Endpoints related to keeping X data in your systems compliant
   *
   * Find out more
   * https://developer.twitter.com/en/docs/twitter-api/compliance/batch-tweet/introduction
   */
  public readonly compliance = {
    /**
    * List Compliance Jobs
    *

    * Returns recent Compliance Jobs for a given job type and optional job status
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
    * Get Compliance Job
    *

    * Returns a single Compliance Job by ID
    * @param id - The ID of the Compliance Job to retrieve.
    * @param params - The params for getBatchComplianceJob
    * @param request_options - Customize the options for this request
    */
    getBatchComplianceJob: (
      id: string,
      params: TwitterParams<getBatchComplianceJob> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<getBatchComplianceJob>> =>
      rest<TwitterResponse<getBatchComplianceJob>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/compliance/jobs/${id}`,
        params,
        method: "GET",
      }),

    /**
    * Posts Compliance stream
    *

    * Streams 100% of compliance data for Posts
    * @param params - The params for getTweetsComplianceStream
    * @param request_options - Customize the options for this request
    */
    getTweetsComplianceStream: (
      params: TwitterParams<getTweetsComplianceStream>,
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<getTweetsComplianceStream>> =>
      stream<TwitterResponse<getTweetsComplianceStream>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/compliance/stream`,
        params,
        method: "GET",
      }),

    /**
    * Posts Label stream
    *

    * Streams 100% of labeling events applied to Posts
    * @param params - The params for getTweetsLabelStream
    * @param request_options - Customize the options for this request
    */
    getTweetsLabelStream: (
      params: TwitterParams<getTweetsLabelStream> = {},
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<getTweetsLabelStream>> =>
      stream<TwitterResponse<getTweetsLabelStream>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/label/stream`,
        params,
        method: "GET",
      }),

    /**
    * Users Compliance stream
    *

    * Streams 100% of compliance data for Users
    * @param params - The params for getUsersComplianceStream
    * @param request_options - Customize the options for this request
    */
    getUsersComplianceStream: (
      params: TwitterParams<getUsersComplianceStream>,
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<getUsersComplianceStream>> =>
      stream<TwitterResponse<getUsersComplianceStream>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/compliance/stream`,
        params,
        method: "GET",
      }),
  };
  /**
   * Direct Messages
   *
   * Endpoints related to retrieving, managing Direct Messages
   *
   * Find out more
   * https://developer.twitter.com/en/docs/twitter-api/direct-messages
   */
  public readonly direct_messages = {
    /**
    * Create a new DM Conversation
    *

    * Creates a new DM Conversation.
    * @param request_body - The request_body for dmConversationIdCreate
    * @param request_options - Customize the options for this request
    */
    dmConversationIdCreate: (
      request_body: TwitterBody<dmConversationIdCreate>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<dmConversationIdCreate>> =>
      rest<TwitterResponse<dmConversationIdCreate>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/dm_conversations`,
        request_body,
        method: "POST",
      }),

    /**
    * Get DM Events for a DM Conversation
    *

    * Returns DM Events for a DM Conversation
    * @param participant_id - The ID of the participant user for the One to One DM conversation.
    * @param params - The params for getDmConversationsWithParticipantIdDmEvents
    * @param request_options - Customize the options for this request
    */
    getDmConversationsWithParticipantIdDmEvents: (
      participant_id: string,
      params: TwitterParams<getDmConversationsWithParticipantIdDmEvents> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<
      TwitterResponse<getDmConversationsWithParticipantIdDmEvents>
    > =>
      paginate<TwitterResponse<getDmConversationsWithParticipantIdDmEvents>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/dm_conversations/with/${participant_id}/dm_events`,
        params,
        method: "GET",
      }),

    /**
    * Send a new message to a user
    *

    * Creates a new message for a DM Conversation with a participant user by ID
    * @param participant_id - The ID of the recipient user that will receive the DM.
    * @param request_body - The request_body for dmConversationWithUserEventIdCreate
    * @param request_options - Customize the options for this request
    */
    dmConversationWithUserEventIdCreate: (
      participant_id: string,
      request_body: TwitterBody<dmConversationWithUserEventIdCreate>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<dmConversationWithUserEventIdCreate>> =>
      rest<TwitterResponse<dmConversationWithUserEventIdCreate>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/dm_conversations/with/${participant_id}/messages`,
        request_body,
        method: "POST",
      }),

    /**
    * Send a new message to a DM Conversation
    *

    * Creates a new message for a DM Conversation specified by DM Conversation ID
    * @param dm_conversation_id - The DM Conversation ID.
    * @param request_body - The request_body for dmConversationByIdEventIdCreate
    * @param request_options - Customize the options for this request
    */
    dmConversationByIdEventIdCreate: (
      dm_conversation_id: string,
      request_body: TwitterBody<dmConversationByIdEventIdCreate>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<dmConversationByIdEventIdCreate>> =>
      rest<TwitterResponse<dmConversationByIdEventIdCreate>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/dm_conversations/${dm_conversation_id}/messages`,
        request_body,
        method: "POST",
      }),

    /**
    * Get DM Events for a DM Conversation
    *

    * Returns DM Events for a DM Conversation
    * @param id - The DM Conversation ID.
    * @param params - The params for getDmConversationsIdDmEvents
    * @param request_options - Customize the options for this request
    */
    getDmConversationsIdDmEvents: (
      id: string,
      params: TwitterParams<getDmConversationsIdDmEvents> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<
      TwitterResponse<getDmConversationsIdDmEvents>
    > =>
      paginate<TwitterResponse<getDmConversationsIdDmEvents>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/dm_conversations/${id}/dm_events`,
        params,
        method: "GET",
      }),

    /**
    * Get recent DM Events
    *

    * Returns recent DM Events across DM conversations
    * @param params - The params for getDmEvents
    * @param request_options - Customize the options for this request
    */
    getDmEvents: (
      params: TwitterParams<getDmEvents> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<getDmEvents>> =>
      paginate<TwitterResponse<getDmEvents>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/dm_events`,
        params,
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
    * Returns the OpenAPI Specification document.
    *

    * Full OpenAPI Specification in JSON format. (See https://github.com/OAI/OpenAPI-Specification/blob/master/README.md)
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

    /**
    * Rules Count
    *

    * Returns the counts of rules from a User's active rule set, to reflect usage by project and application.
    * @param params - The params for getRuleCount
    * @param request_options - Customize the options for this request
    */
    getRuleCount: (
      params: TwitterParams<getRuleCount> = {},
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<getRuleCount>> =>
      rest<TwitterResponse<getRuleCount>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/search/stream/rules/counts`,
        params,
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
    * @param id - The ID of the List to delete.
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
    * List lookup by List ID.
    *

    * Returns a List.
    * @param id - The ID of the List.
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
    * Update List.
    *

    * Update a List that you own.
    * @param id - The ID of the List to modify.
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
    * Add a List member
    *

    * Causes a User to become a member of a List.
    * @param id - The ID of the List for which to add a member.
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

    * Causes a User to be removed from the members of a List.
    * @param id - The ID of the List to remove a member.
    * @param user_id - The ID of User that will be removed from the List.
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

    /**
    * Get User's Followed Lists
    *

    * Returns a User's followed Lists.
    * @param id - The ID of the User to lookup.
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

    * Causes a User to follow a List.
    * @param id - The ID of the authenticated source User that will follow the List.
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

    * Causes a User to unfollow a List.
    * @param id - The ID of the authenticated source User that will unfollow the List.
    * @param list_id - The ID of the List to unfollow.
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
    * @param id - The ID of the User to lookup.
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
    * Get a User's Owned Lists.
    *

    * Get a User's Owned Lists.
    * @param id - The ID of the User to lookup.
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
    * @param id - The ID of the authenticated source User for whom to return results.
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

    * Causes a User to pin a List.
    * @param id - The ID of the authenticated source User that will pin the List.
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

    * Causes a User to remove a pinned List.
    * @param id - The ID of the authenticated source User for whom to return results.
    * @param list_id - The ID of the List to unpin.
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
    * Space lookup by Space ID
    *

    * Returns a variety of information about the Space specified by the requested ID
    * @param id - The ID of the Space to be retrieved.
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
    * Retrieve the list of Users who purchased a ticket to the given space
    *

    * Retrieves the list of Users who purchased a ticket to the given space
    * @param id - The ID of the Space to be retrieved.
    * @param params - The params for spaceBuyers
    * @param request_options - Customize the options for this request
    */
    spaceBuyers: (
      id: string,
      params: TwitterParams<spaceBuyers> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<spaceBuyers>> =>
      paginate<TwitterResponse<spaceBuyers>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/spaces/${id}/buyers`,
        params,
        method: "GET",
      }),

    /**
    * Retrieve Posts from a Space.
    *

    * Retrieves Posts shared in the specified Space.
    * @param id - The ID of the Space to be retrieved.
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
    * List Posts timeline by List ID.
    *

    * Returns a list of Posts associated with the provided List ID.
    * @param id - The ID of the List.
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

    /**
    * Post lookup by Post IDs
    *

    * Returns a variety of information about the Post specified by the requested ID.
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
    * Creation of a Post
    *

    * Causes the User to create a Post under the authorized account.
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
    * Full archive search counts
    *

    * Returns Post Counts that match a search query.
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
    * Recent search counts
    *

    * Returns Post Counts from the last 7 days that match a search query.
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
    * Firehose stream
    *

    * Streams 100% of public Posts.
    * @param params - The params for getTweetsFirehoseStream
    * @param request_options - Customize the options for this request
    */
    getTweetsFirehoseStream: (
      params: TwitterParams<getTweetsFirehoseStream>,
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<getTweetsFirehoseStream>> =>
      stream<TwitterResponse<getTweetsFirehoseStream>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/firehose/stream`,
        params,
        method: "GET",
      }),

    /**
    * English Language Firehose stream
    *

    * Streams 100% of English Language public Posts.
    * @param params - The params for getTweetsFirehoseStreamLangEn
    * @param request_options - Customize the options for this request
    */
    getTweetsFirehoseStreamLangEn: (
      params: TwitterParams<getTweetsFirehoseStreamLangEn>,
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<getTweetsFirehoseStreamLangEn>> =>
      stream<TwitterResponse<getTweetsFirehoseStreamLangEn>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/firehose/stream/lang/en`,
        params,
        method: "GET",
      }),

    /**
    * Japanese Language Firehose stream
    *

    * Streams 100% of Japanese Language public Posts.
    * @param params - The params for getTweetsFirehoseStreamLangJa
    * @param request_options - Customize the options for this request
    */
    getTweetsFirehoseStreamLangJa: (
      params: TwitterParams<getTweetsFirehoseStreamLangJa>,
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<getTweetsFirehoseStreamLangJa>> =>
      stream<TwitterResponse<getTweetsFirehoseStreamLangJa>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/firehose/stream/lang/ja`,
        params,
        method: "GET",
      }),

    /**
    * Korean Language Firehose stream
    *

    * Streams 100% of Korean Language public Posts.
    * @param params - The params for getTweetsFirehoseStreamLangKo
    * @param request_options - Customize the options for this request
    */
    getTweetsFirehoseStreamLangKo: (
      params: TwitterParams<getTweetsFirehoseStreamLangKo>,
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<getTweetsFirehoseStreamLangKo>> =>
      stream<TwitterResponse<getTweetsFirehoseStreamLangKo>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/firehose/stream/lang/ko`,
        params,
        method: "GET",
      }),

    /**
    * Portuguese Language Firehose stream
    *

    * Streams 100% of Portuguese Language public Posts.
    * @param params - The params for getTweetsFirehoseStreamLangPt
    * @param request_options - Customize the options for this request
    */
    getTweetsFirehoseStreamLangPt: (
      params: TwitterParams<getTweetsFirehoseStreamLangPt>,
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<getTweetsFirehoseStreamLangPt>> =>
      stream<TwitterResponse<getTweetsFirehoseStreamLangPt>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/firehose/stream/lang/pt`,
        params,
        method: "GET",
      }),

    /**
    * Sample stream
    *

    * Streams a deterministic 1% of public Posts.
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
    * Sample 10% stream
    *

    * Streams a deterministic 10% of public Posts.
    * @param params - The params for getTweetsSample10Stream
    * @param request_options - Customize the options for this request
    */
    getTweetsSample10Stream: (
      params: TwitterParams<getTweetsSample10Stream>,
      request_options?: Partial<RequestOptions>
    ): AsyncGenerator<TwitterResponse<getTweetsSample10Stream>> =>
      stream<TwitterResponse<getTweetsSample10Stream>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/sample10/stream`,
        params,
        method: "GET",
      }),

    /**
    * Full-archive search
    *

    * Returns Posts that match a search query.
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
    * Recent search
    *

    * Returns Posts from the last 7 days that match a search query.
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
    * Filtered stream
    *

    * Streams Posts matching the stream's active rule set.
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

    * Returns rules from a User's active rule set. Users can fetch all of their rules or a subset, specified by the provided rule ids.
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

    * Add or delete rules from a User's active rule set. Users can provide unique, optionally tagged rules to add. Users can delete their entire rule set or a subset specified by rule ids or values.
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
    * Post delete by Post ID
    *

    * Delete specified Post (in the path) by ID.
    * @param id - The ID of the Post to be deleted.
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
    * Post lookup by Post ID
    *

    * Returns a variety of information about the Post specified by the requested ID.
    * @param id - A single Post ID.
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
    * Retrieve Posts that quote a Post.
    *

    * Returns a variety of information about each Post that quotes the Post specified by the requested ID.
    * @param id - A single Post ID.
    * @param params - The params for findTweetsThatQuoteATweet
    * @param request_options - Customize the options for this request
    */
    findTweetsThatQuoteATweet: (
      id: string,
      params: TwitterParams<findTweetsThatQuoteATweet> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<findTweetsThatQuoteATweet>> =>
      paginate<TwitterResponse<findTweetsThatQuoteATweet>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/${id}/quote_tweets`,
        params,
        method: "GET",
      }),

    /**
    * Retrieve Posts that repost a Post.
    *

    * Returns a variety of information about each Post that has retweeted the Post specified by the requested ID.
    * @param id - A single Post ID.
    * @param params - The params for findTweetsThatRetweetATweet
    * @param request_options - Customize the options for this request
    */
    findTweetsThatRetweetATweet: (
      id: string,
      params: TwitterParams<findTweetsThatRetweetATweet> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<findTweetsThatRetweetATweet>> =>
      paginate<TwitterResponse<findTweetsThatRetweetATweet>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/${id}/retweets`,
        params,
        method: "GET",
      }),

    /**
    * Hide replies
    *

    * Hides or unhides a reply to an owned conversation.
    * @param tweet_id - The ID of the reply that you want to hide or unhide.
    * @param request_body - The request_body for hideReplyById
    * @param request_options - Customize the options for this request
    */
    hideReplyById: (
      tweet_id: string,
      request_body: TwitterBody<hideReplyById>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<hideReplyById>> =>
      rest<TwitterResponse<hideReplyById>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/tweets/${tweet_id}/hidden`,
        request_body,
        method: "PUT",
      }),

    /**
    * Returns Post objects liked by the provided User ID
    *

    * Returns a list of Posts liked by the provided User ID
    * @param id - The ID of the User to lookup.
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
    * Causes the User (in the path) to like the specified Post
    *

    * Causes the User (in the path) to like the specified Post. The User in the path must match the User context authorizing the request.
    * @param id - The ID of the authenticated source User that is requesting to like the Post.
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
    * Causes the User (in the path) to unlike the specified Post
    *

    * Causes the User (in the path) to unlike the specified Post. The User must match the User context authorizing the request
    * @param id - The ID of the authenticated source User that is requesting to unlike the Post.
    * @param tweet_id - The ID of the Post that the User is requesting to unlike.
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
    * User mention timeline by User ID
    *

    * Returns Post objects that mention username associated to the provided User ID
    * @param id - The ID of the User to lookup.
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
    * Causes the User (in the path) to repost the specified Post.
    *

    * Causes the User (in the path) to repost the specified Post. The User in the path must match the User context authorizing the request.
    * @param id - The ID of the authenticated source User that is requesting to repost the Post.
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
    * Causes the User (in the path) to unretweet the specified Post
    *

    * Causes the User (in the path) to unretweet the specified Post. The User must match the User context authorizing the request
    * @param id - The ID of the authenticated source User that is requesting to repost the Post.
    * @param source_tweet_id - The ID of the Post that the User is requesting to unretweet.
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
    * User home timeline by User ID
    *

    * Returns Post objects that appears in the provided User ID's home timeline
    * @param id - The ID of the authenticated source User to list Reverse Chronological Timeline Posts of.
    * @param params - The params for usersIdTimeline
    * @param request_options - Customize the options for this request
    */
    usersIdTimeline: (
      id: string,
      params: TwitterParams<usersIdTimeline> = {},
      request_options?: Partial<RequestOptions>
    ): TwitterPaginatedResponse<TwitterResponse<usersIdTimeline>> =>
      paginate<TwitterResponse<usersIdTimeline>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/${id}/timelines/reverse_chronological`,
        params,
        method: "GET",
      }),

    /**
    * User Posts timeline by User ID
    *

    * Returns a list of Posts authored by the provided User ID
    * @param id - The ID of the User to lookup.
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
    * Returns User objects that follow a List by the provided List ID
    *

    * Returns a list of Users that follow a List by the provided List ID
    * @param id - The ID of the List.
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
    * Returns User objects that are members of a List by the provided List ID.
    *

    * Returns a list of Users that are members of a List by the provided List ID.
    * @param id - The ID of the List.
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

    /**
    * Returns User objects that have liked the provided Post ID
    *

    * Returns a list of Users that have liked the provided Post ID
    * @param id - A single Post ID.
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
    * Returns User objects that have retweeted the provided Post ID
    *

    * Returns a list of Users that have retweeted the provided Post ID
    * @param id - A single Post ID.
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
    * User lookup by IDs
    *

    * This endpoint returns information about Users. Specify Users by their ID.
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
    * User lookup by usernames
    *

    * This endpoint returns information about Users. Specify Users by their username.
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
    * User lookup by username
    *

    * This endpoint returns information about a User. Specify User by username.
    * @param username - A username.
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
    * User lookup me
    *

    * This endpoint returns information about the requesting User.
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
    * User search
    *

    * Returns Users that match a search query.
    * @param params - The params for searchUserByQuery
    * @param request_options - Customize the options for this request
    */
    searchUserByQuery: (
      params: TwitterParams<searchUserByQuery>,
      request_options?: Partial<RequestOptions>
    ): Promise<TwitterResponse<searchUserByQuery>> =>
      rest<TwitterResponse<searchUserByQuery>>({
        auth: this.#auth,
        ...this.#defaultRequestOptions,
        ...request_options,
        endpoint: `/2/users/search`,
        params,
        method: "GET",
      }),

    /**
    * User lookup by ID
    *

    * This endpoint returns information about a User. Specify User by ID.
    * @param id - The ID of the User to lookup.
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
    * Returns User objects that are blocked by provided User ID
    *

    * Returns a list of Users that are blocked by the provided User ID
    * @param id - The ID of the authenticated source User for whom to return results.
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
    * Followers by User ID
    *

    * Returns a list of Users who are followers of the specified User ID.
    * @param id - The ID of the User to lookup.
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

    * Returns a list of Users that are being followed by the provided User ID
    * @param id - The ID of the User to lookup.
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

    * Causes the User(in the path) to follow, or “request to follow” for protected Users, the target User. The User(in the path) must match the User context authorizing the request
    * @param id - The ID of the authenticated source User that is requesting to follow the target User.
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
    * Returns User objects that are muted by the provided User ID
    *

    * Returns a list of Users that are muted by the provided User ID
    * @param id - The ID of the authenticated source User for whom to return results.
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
    * Mute User by User ID.
    *

    * Causes the User (in the path) to mute the target User. The User (in the path) must match the User context authorizing the request.
    * @param id - The ID of the authenticated source User that is requesting to mute the target User.
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
    * Unfollow User
    *

    * Causes the source User to unfollow the target User. The source User must match the User context authorizing the request
    * @param source_user_id - The ID of the authenticated source User that is requesting to unfollow the target User.
    * @param target_user_id - The ID of the User that the source User is requesting to unfollow.
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
    * Unmute User by User ID
    *

    * Causes the source User to unmute the target User. The source User must match the User context authorizing the request
    * @param source_user_id - The ID of the authenticated source User that is requesting to unmute the target User.
    * @param target_user_id - The ID of the User that the source User is requesting to unmute.
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
  };
}
