export const helpers = {
    methods: {
      addKeyToPost: function(posts){
        for (let idx in posts) { // add key id to each post
          const post = posts[idx]
          const dbkey = post['.key']
          post.id = dbkey
          posts[idx] = post
        }
      }
      /*
      sortDesc: function (a, b){
        if (a.date > b.date)
            return -1
        if (a.date < b.date)
            return 1;
        return 0
      }
      */
    }
}