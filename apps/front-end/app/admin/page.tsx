import Login from "./@login/page";
import Dashboard from "./@dashboard/page";

export default function Admin(): JSX.Element {
	/*const user = {
	 name:  "John Doe",
	 email: "j.doe@example.com",
	 };*/

	const user = null;

	return (
		user
		? <Dashboard />
		: <Login />
	);
}