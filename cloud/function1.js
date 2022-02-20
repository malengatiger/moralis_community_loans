/* eslint-disable no-undef */
Moralis.Cloud.define("users", async (request) => {
  const query = new Moralis.Query("Users");
  //   query.equalTo("movie", request.params.movie);
  const results = await query.find();

  return results;
});
