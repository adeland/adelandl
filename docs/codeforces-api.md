# Codeforces API — Summary

A reference summary of the Codeforces API, covering the available methods and the structure of every object returned by those methods.

---

## Methods

The following API methods are available:

- `blogEntry.comments`
- `blogEntry.view`
- `contest.hacks`
- `contest.list`
- `contest.ratingChanges`
- `contest.standings`
- `contest.status`
- `group.isManager`
- `problemset.problems`
- `problemset.recentStatus`
- `recentActions`
- `system.status`
- `user.blogEntries`
- `user.friends`
- `user.info`
- `user.ratedList`
- `user.rating`
- `user.status`

---

## Return Objects

### User

Represents a Codeforces user.

| Field | Description |
|---|---|
| `handle` | String. Codeforces user handle. |
| `email` | String. Shown only if user allowed to share contact info. |
| `vkId` | String. User id for VK social network. Shown only if user allowed to share contact info. |
| `openId` | String. Shown only if user allowed to share contact info. |
| `firstName` | String. Localized. Can be absent. |
| `lastName` | String. Localized. Can be absent. |
| `country` | String. Localized. Can be absent. |
| `city` | String. Localized. Can be absent. |
| `organization` | String. Localized. Can be absent. |
| `contribution` | Integer. User contribution. |
| `rank` | String. Localized. |
| `rating` | Integer. |
| `maxRank` | String. Localized. |
| `maxRating` | Integer. |
| `lastOnlineTimeSeconds` | Integer. Time when user was last seen online, in unix format. |
| `registrationTimeSeconds` | Integer. Time when user was registered, in unix format. |
| `friendOfCount` | Integer. Number of users who have this user in friends. |
| `avatar` | String. User's avatar URL. |
| `titlePhoto` | String. User's title photo URL. |

### BlogEntry

Represents a Codeforces blog entry. May be in either short or full version.

| Field | Description |
|---|---|
| `id` | Integer. |
| `originalLocale` | String. Original locale of the blog entry. |
| `creationTimeSeconds` | Integer. Time when blog entry was created, in unix format. |
| `authorHandle` | String. Author user handle. |
| `title` | String. Localized. |
| `content` | String. Localized. Not included in short version. |
| `locale` | String. |
| `modificationTimeSeconds` | Integer. Time when blog entry has been updated, in unix format. |
| `allowViewHistory` | Boolean. If true, you can view any specific revision of the blog entry. |
| `tags` | String list. |
| `rating` | Integer. |

### Comment

Represents a comment.

| Field | Description |
|---|---|
| `id` | Integer. |
| `creationTimeSeconds` | Integer. Time when comment was created, in unix format. |
| `commentatorHandle` | String. |
| `locale` | String. |
| `text` | String. |
| `parentCommentId` | Integer. Can be absent. |
| `rating` | Integer. |

### RecentAction

Represents a recent action.

| Field | Description |
|---|---|
| `timeSeconds` | Integer. Action time, in unix format. |
| `blogEntry` | `BlogEntry` object in short form. Can be absent. |
| `comment` | `Comment` object. Can be absent. |

### RatingChange

Represents a participation of user in a rated contest.

| Field | Description |
|---|---|
| `contestId` | Integer. |
| `contestName` | String. Localized. |
| `handle` | String. Codeforces user handle. |
| `rank` | Integer. Place of the user in the contest at the moment of rating update. If rank later changes (e.g. someone is disqualified), this field is not updated. |
| `ratingUpdateTimeSeconds` | Integer. Time when rating for the contest was updated, in unix format. |
| `oldRating` | Integer. User rating before the contest. |
| `newRating` | Integer. User rating after the contest. |

### Contest

Represents a contest on Codeforces.

| Field | Description |
|---|---|
| `id` | Integer. |
| `name` | String. Localized. |
| `type` | Enum: `CF`, `IOI`, `ICPC`. Scoring system used for the contest. |
| `phase` | Enum: `BEFORE`, `CODING`, `PENDING_SYSTEM_TEST`, `SYSTEM_TEST`, `FINISHED`. |
| `frozen` | Boolean. If true, the ranklist is frozen and shows only submissions created before the freeze. |
| `durationSeconds` | Integer. Duration of the contest in seconds. |
| `freezeDurationSeconds` | Integer. Can be absent. Ranklist freeze duration in seconds, if any. |
| `startTimeSeconds` | Integer. Can be absent. Contest start time in unix format. |
| `relativeTimeSeconds` | Integer. Can be absent. Seconds passed after the start of the contest. Can be negative. |
| `preparedBy` | String. Can be absent. Handle of the user who created the contest. |
| `websiteUrl` | String. Can be absent. URL for contest-related website. |
| `description` | String. Localized. Can be absent. |
| `difficulty` | Integer. Can be absent. From 1 to 5. Larger means more difficult problems. |
| `kind` | String. Localized. Can be absent. Human-readable contest type (e.g. Official ICPC Contest, Official School Contest, Opencup Contest, School/University/City/Region Championship, Training Camp Contest, Official International Personal Contest, Training Contest). |
| `icpcRegion` | String. Localized. Can be absent. Region name for official ICPC contests. |
| `country` | String. Localized. Can be absent. |
| `city` | String. Localized. Can be absent. |
| `season` | String. Can be absent. |

### Party

Represents a party participating in a contest.

| Field | Description |
|---|---|
| `contestId` | Integer. Can be absent. Id of the contest in which party is participating. |
| `members` | List of `Member` objects. Members of the party. |
| `participantType` | Enum: `CONTESTANT`, `PRACTICE`, `VIRTUAL`, `MANAGER`, `OUT_OF_COMPETITION`. |
| `teamId` | Integer. Can be absent. Unique team id if party is a team; otherwise absent. |
| `teamName` | String. Localized. Can be absent. Localized name if party is a team or ghost; otherwise absent. |
| `ghost` | Boolean. If true, this party is a ghost (participated in the contest but not on Codeforces — e.g. ghosts of Petrozavodsk Training Camp participants in Andrew Stankevich Contests on Gym). |
| `room` | Integer. Can be absent. Room of the party. Absent if no room. |
| `startTimeSeconds` | Integer. Can be absent. Time when this party started a contest. |

### Member

Represents a member of a party.

| Field | Description |
|---|---|
| `handle` | String. Codeforces user handle. |
| `name` | String. Can be absent. User's name if available. |

### Problem

Represents a problem.

| Field | Description |
|---|---|
| `contestId` | Integer. Can be absent. Id of the contest containing the problem. |
| `problemsetName` | String. Can be absent. Short name of the problemset the problem belongs to. |
| `index` | String. Usually a letter or letter with digit(s) indicating the problem index in a contest. |
| `name` | String. Localized. |
| `type` | Enum: `PROGRAMMING`, `QUESTION`. |
| `points` | Floating point number. Can be absent. Maximum amount of points for the problem. |
| `rating` | Integer. Can be absent. Problem rating (difficulty). |
| `tags` | String list. Problem tags. |

### ProblemStatistics

Represents statistic data about a problem.

| Field | Description |
|---|---|
| `contestId` | Integer. Can be absent. Id of the contest containing the problem. |
| `index` | String. Usually a letter or letter with digit(s) indicating the problem index in a contest. |
| `solvedCount` | Integer. Number of users who solved the problem. |

### Submission

Represents a submission.

| Field | Description |
|---|---|
| `id` | Integer. |
| `contestId` | Integer. Can be absent. |
| `creationTimeSeconds` | Integer. Time when submission was created, in unix format. |
| `relativeTimeSeconds` | Integer. Seconds passed after the start of the contest (or virtual start for virtual parties) before the submission. |
| `problem` | `Problem` object. |
| `author` | `Party` object. |
| `programmingLanguage` | String. |
| `verdict` | Enum: `FAILED`, `OK`, `PARTIAL`, `COMPILATION_ERROR`, `RUNTIME_ERROR`, `WRONG_ANSWER`, `PRESENTATION_ERROR`, `TIME_LIMIT_EXCEEDED`, `MEMORY_LIMIT_EXCEEDED`, `IDLENESS_LIMIT_EXCEEDED`, `SECURITY_VIOLATED`, `CRASHED`, `INPUT_PREPARATION_CRASHED`, `CHALLENGED`, `SKIPPED`, `TESTING`, `REJECTED`, `SUBMITTED`. Can be absent. |
| `testset` | Enum: `SAMPLES`, `PRETESTS`, `TESTS`, `CHALLENGES`, `TESTS1`, ..., `TESTS10`. Testset used for judging the submission. |
| `passedTestCount` | Integer. Number of passed tests. |
| `timeConsumedMillis` | Integer. Maximum time in milliseconds consumed by the solution for one test. |
| `memoryConsumedBytes` | Integer. Maximum memory in bytes consumed by the solution for one test. |
| `points` | Floating point number. Can be absent. Number of scored points for IOI-like contests. |

### Hack

Represents a hack made during a Codeforces Round.

| Field | Description |
|---|---|
| `id` | Integer. |
| `creationTimeSeconds` | Integer. Hack creation time in unix format. |
| `hacker` | `Party` object. |
| `defender` | `Party` object. |
| `verdict` | Enum: `HACK_SUCCESSFUL`, `HACK_UNSUCCESSFUL`, `INVALID_INPUT`, `GENERATOR_INCOMPILABLE`, `GENERATOR_CRASHED`, `IGNORED`, `TESTING`, `OTHER`. Can be absent. |
| `problem` | `Problem` object. Hacked problem. |
| `test` | String. Can be absent. |
| `judgeProtocol` | Object with three fields: `manual`, `protocol`, and `verdict`. `manual` is `"true"` or `"false"`; if `"true"`, the test for the hack was entered manually. `protocol` and `verdict` contain a human-readable description of judge protocol and hack verdict. Localized. Can be absent. |

### RanklistRow

Represents a ranklist row.

| Field | Description |
|---|---|
| `party` | `Party` object. Party that took the corresponding place in the contest. |
| `rank` | Integer. Party place in the contest. |
| `points` | Floating point number. Total points scored by the party. |
| `penalty` | Integer. Total penalty (in ICPC meaning) of the party. |
| `successfulHackCount` | Integer. |
| `unsuccessfulHackCount` | Integer. |
| `problemResults` | List of `ProblemResult` objects. Party results for each problem. Order matches the `problems` field of the returned object. |
| `lastSubmissionTimeSeconds` | Integer. For IOI contests only. Time in seconds from the start of the contest to the last submission that added points to the party's total score. Can be absent. |

### ProblemResult

Represents a party's submission results for a problem.

| Field | Description |
|---|---|
| `points` | Floating point number. |
| `penalty` | Integer. Penalty (in ICPC meaning) of the party for this problem. Can be absent. |
| `rejectedAttemptCount` | Integer. Number of incorrect submissions. |
| `type` | Enum: `PRELIMINARY`, `FINAL`. If `PRELIMINARY`, points can decrease (e.g. if the solution fails during system test). Otherwise, the party can only increase points by submitting better solutions. |
| `bestSubmissionTimeSeconds` | Integer. Seconds after the start of the contest before the submission that brought the maximal points for this problem. Can be absent. |