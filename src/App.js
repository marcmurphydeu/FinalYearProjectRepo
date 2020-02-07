import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar';
import UserForm from './Components/Form';




function App() {
    return (
        <React.Fragment>
            <title>Gaze</title>
            <NavBar/>
            {/* <EditCustomerController id={1} /> */}
            <UserForm/>
        </React.Fragment>
      
    );
}





// // Notice explicit suffix "Controller"
// function EditCustomerController({ id }) {
//   let { customers, dispatch } = useCustomers();

//   let customer = customers.find(c => c.id === id);
//   if (!customer) {
//     return <NotFound />;
//   }

//   let onSave = (newCustomerData) => {
//     return fetch({
//       url: `/api/customers/${id}`,
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newCustomerData)
//     })
//       .then(response => response.json())
//       .then(apiCustomer => {
//         // Formatting for differences between backend and frontend
//         //   e.g. Rails/Django snake_case into JavaScript camelCase
//         dispatch({
//           type: "UPDATE_CUSTOMER",
//           payload: formatChangeForFrontend(apiCustomer)
//         });
//       })
//   };

//   return <CustomerForm onSave={onSave} initialName={customer.name} initialEmail={customer.email} />
// }

// // Notice no special name; just a React component that knows about React things
// function CustomerForm({onSave, initialName, initialEmail}) {
//   let [errors, setErrors] = React.useState()
//   let [saving, setSaving] = React.useState(false)
//   let [name, setName] = React.useState(initialName);
//   let [email, setEmail] = React.useState(initialEmail);

//   let onSaveWrapped = () => {
//     setSaving(true)
//     onSave({name, email})
//       .catch((error) => {
//         setErrors(error)
//       })
//       .finally(() => {
//         setSaving(false)
//       })
//   }

//   return (
//     <div>
//       {errors && <ErrorDisplay errors={errors} />}
//       <input
//         type="text"
//         name="name"
//         value={name}
//         onChange={e => setName(e.target.value)}
//       />
//       <input
//         type="text"
//         name="email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//       />
//       <button onClick={onSaveWrapped} disabled={saving}>Save</button>
//     </div>
//   );
// }





export default App;
