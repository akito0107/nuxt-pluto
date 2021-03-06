export const state = () => ({
  user: null,
});

export const actions = {
  async login(context, data) {
    try {
      const res = await this.$axios.post("/api/login", {
        username: data.username,
        password: data.password,
      });
      context.commit("SET_USER", res.data);
      if (data.redirect) {
        this.$router.push(data.redirect.location);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials");
      }
      throw error;
    }
  },
  async logout(context) {
    await this.$axios.post("/api/logout");
    context.commit("SET_USER", null);
  },
};

export const mutations = {
  SET_USER: function(state, data) {
    state.user = data;
  },
};
