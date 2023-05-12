// import http from '../config/httpConfig';
// import qs from 'qs';
// //import axios from 'axios';
//
// const option = {
//   headers: {
//     'content-type': 'application/json'
//   }
// };
//
// export default {
//   getList(param) {
//     const queryParam = qs.stringify(param);
//     let url = `/api/v1/user/list?${queryParam}`;
//
//     return http.get(url);
//   },
//
//   initPassword(loginId){
//     const url = `api/v1/user/${loginId}/initPass`;
//
//     return http.put(url)
//   },
//
//   updateLock(param) {
//     const url = 'api/v1/user/lock';
//     return http.put(
//         url,
//         param,
//         option
//     )
//   },
//   updateApprove(param) {
//     const url = 'api/v1/user/approve';
//     return http.put(
//         url,
//         param,
//         option
//     )
//   },
//
//   modifyUser(user) {
//     const url = `api/v1/user/${user.loginId}`;
//     return http.put(
//         url,
//         user,
//         option
//     )
//   },
//
//   deleteUser(userList) {
//     const url = `api/v1/user?userList=${userList}`;
//
//     return http.delete(url)
//   },
//
//
// };
