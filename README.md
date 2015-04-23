
# Build An API

## Learning Competencies
- Design and architect an API for the public.

## Summary

Design and document a simple web API against a hacker news clone. The models 
already exist, it will be up to you to write Sinatra routes to manipulate data 
(using the CRUD HTTP verbs: `GET`, `POST`, `PUT`, and `DELETE`).

This API is meant to be consumed by the public. Think about how Twitter or
Github built their API against their app(s). You will be wearing your API 
designer/architect hats and thinking about how you want to expose data and 
services to the public just like Twitter and Github developers did.


## Endpoints ([what's an API Endpoint?](http://bit.ly/1jIgbNw))
- [GET] API key
- [GET] list of users
- [GET] list of articles
- [GET] list of comments for a user
- [POST] create a new article by a user
- [POST] create a new comment for an article (a comment is owned by a user)

## Statuses
It is important to always send back the appropriate status codes with your API response.
There are [many standard and nonstandard](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
HTTP status codes you can use. Here are some of the most commonly-used statuses:

<table>
  <thead>
    <th>HTTP Status Code</th>
    <th>Status</th>
    <th>Description</th>
  </thead>
  <tbody>
       <tr>
        <td>200</td>
        <td>OK (Immediate response)</td>
        <td>The request was a success and the response includes the
            requested data.</td>
    </tr>

    <tr>
        <td>202</td>
        <td>OK (Immediate response)</td>
        <td>The request was received and queued for processing, but not yet
            processed. Usually in the case of a POST request</td>
    </tr>

    <tr>
        <td>400</td>
        <td>Bad Request</td>
        <td>The request was malformed or unexpected.</td>
    </tr>

    <tr>
        <td>401</td>
        <td>Unauthorized</td>
        <td>The request did not include a valid API key</td>
    </tr>

    <tr>
        <td>404</td>
        <td>Not Found</td>
        <td>The requested resource was not found.</td>
    </tr>
    <tr>
        <td>429</td>
        <td>Too Many Requests</td>
        <td>The rate limit has been reached for this API key.</td>
    </tr>
    <tr>
        <td>500</td>
        <td>Internal Server Error</td>
        <td>The request could not be fulfilled due to an unexpected
            error.</td>
    </tr>
</tbody>
</table>

## Versioning
APIs should be properly versioned. APIs evolve and change, and we must do this 
while supporting old versions. Otherwise, if you just change your API, a lot of 
your clients would be in trouble. Although we won't be developing multiple 
versions (today we're working on V1), it is important that we plan for the 
future and properly namespace our documentation and work under V1 namespace.

## Releases
**Note about testing:** 
*Tests, especially while building an API are NOT optional or nice to have.* 
Today, we're going to try to TDD our way through building your API. We've 
already written the model tests for you in `spec/models/`, your job 
is to write controller tests for the app as you go in `spec/controllers/`. Your 
workflow for this project should look like this:

    1. Decide which endpoint you want to write.
    2. Add a section in the README describing the behavior of that endpoint.
    3. Write the simplest failing test you can think of for that endpoint.
    4. See the test fail.
    5. Write code to make that test pass.
    6. Return to step 3. If there is nothing else you can test on that endpoint, return to step 1.

### Release 0: Documentation
Designing an API starts with documentation. Without proper and detailed documentation
an API would not be dependable. What should you include?  Let's follow 
[Twitter's REST API](https://dev.twitter.com/docs/api/1.1) model.  We will not 
implement or write a single piece of code until we get our documentation right, 
this is an essential part of this exercise and it's not trivial. Rename this 
file to `lesson.md` and replace it with your `README.md` file.

*Try to keep REST conventions in mind.* Most developers use the conventions that 
Ruby on Rails adheres to for their routes. You can find examples in the table
[here](http://guides.rubyonrails.org/routing.html#crud-verbs-and-actions)

### Release 1: Implement GET requests
_pending approval of documentation from an instructor_

Implement the following endpoints:
- [GET] list of users
- [GET] list of articles for a user

### Release 2: Implement POST requests
_pending approval of documentation from an instructor_

Implement the following endpoints:
- [POST] create a new article by a user
- [POST] create a new comment for an article (a comment is owned by a user)

### Release 3: Implement authorization and rate limit
POST requests need to be authorized. We shouldn't be able to create a new article
or comment without being authorized to do so. While this is a complex subject
and API authorization could be implemented in various ways to increase
security measures, we will keep it simple. This will be done through 2 parts:

#### 1 - API key generation
- Start at the documentation, add a new endpoint:

  [GET] API key: When the user hits this endpoint, we will create a [new and unique
  api key](http://www.ruby-doc.org/stdlib-1.9.3/libdoc/securerandom/rdoc/SecureRandom.html#method-c-hex).
  This api key will be saved to the database (you will need to create the table). 
  We also need to include a column that keeps track of how many times this key 
  was used.

- Implement the endpoint.


#### 2 - POST requests require an API key
- Start at the documentation:
  - Modify all of the POST endpoints to require an API key. If no API key is 
    provided, we must send back an Unauthorized status with a message.
  - Modify all of the POST endpoints to enforce a rate limit of your choosing.
  - When users exceed their rate limit, send back a Too Many Requests status.

- Implementation.

### Release 4: Deployment
Get your application up on Heroku so the outside world can see it! 

Be sure to include the URL of your app in your README.md.

### Release 5: Consume It!
Write a simple application to consume your now-deployed API. You've already 
written an app to consume an API, so it shouldn't take long to write a small 
app to consume the API you just wrote.
