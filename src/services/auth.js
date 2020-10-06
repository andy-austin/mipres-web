export const setCookies = (state, access_token = null, nit = null) => {
    state.nit = nit;
    state.access_token = access_token;
    localStorage.setItem('nit', nit);
    localStorage.setItem('access_token', access_token);
}