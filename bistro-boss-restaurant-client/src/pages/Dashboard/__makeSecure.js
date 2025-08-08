/**
 * ------------
 *   BASIC
 * ------------
 * 1. do not show the link to them who should not see it
 * Only show to the person/types of user who should see it. Like: admin
 * 2. Do not allow to visit the link by typing on the url.
 * use AdminRoute that will check whether the user is admin or not, if not admin then redirect to any other page. You could do send them to the home page.
 * 
 * ------------
 * TO SEND DATA
 * ------------
 * 1. verify jwt token(send authorization token in the header to the server)if possible use axios to send jwt token by intercepting the request
 * 2. If it is an admin activity make sure user is posting data by using verifyAdmin
 * */