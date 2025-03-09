// import Cors from 'cors';
// import { NextApiRequest, NextApiResponse } from 'next';

// const cors = Cors({
//   methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   origin: '*',
// });

// const allowCorsMiddleware = (req: NextApiRequest, res: NextApiResponse, fn) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// };

// export default allowCorsMiddleware;
