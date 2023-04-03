// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// export const SignupForm = () => {
//   const [customers, setCustomers] = useState([{}]);
//   const [refreshPage, setRefreshPage] = useState(false);

// const formSchema = yup.object().shape({
//     email: yup.string().email("Invalid email").required("Must enter email"),
//     password: yup.string().password("Invalid password").required('must enter password'),
//     name: yup.string().required("Must enter a name").max(15),
// });

// const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: formSchema,
//     onSubmit: (values) => {
//       fetch("customers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values, null, 2),
//       }).then((res) => {
//         if (res.status == 200) {
//           setRefreshPage(!refreshPage);
//         }
//       });
//     },
//   });

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
//         <label htmlFor="email">Email Address</label>
//         <br />
//         <input
//           id="email"
//           name="email"
//           onChange={formik.handleChange}
//           value={formik.values.email}
//         />
//         <p style={{ color: "red" }}> {formik.errors.email}</p>
//         <label htmlFor="name">Name</label>
//         <br />

//         <input
//           id="name"
//           name="name"
//           onChange={formik.handleChange}
//           value={formik.values.name}
//         />
//         <p style={{ color: "red" }}> {formik.errors.name}</p>

//         <label htmlFor="age">age</label>
//         <br />

//         <input
//           id="age"
//           name="age"
//           onChange={formik.handleChange}
//           value={formik.values.age}
//         />
//         <p style={{ color: "red" }}> {formik.errors.age}</p>
//         <button type="submit">Submit</button>
//       </form>
//       <table style={{ padding: "15px" }}>
//         <tbody>
//           <tr>
//             <th>name</th>
//             <th>email</th>
//             <th>age</th>
//           </tr>
//           {customers === "undefined" ? (
//             <p>Loading</p>
//           ) : (
//             customers.map((customer, i) => (
//               <>
//                 <tr key={i}>
//                   <td>{customer.name}</td>
//                   <td>{customer.email}</td>
//                   <td>{customer.age}</td>
//                 </tr>
//               </>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
//             }
