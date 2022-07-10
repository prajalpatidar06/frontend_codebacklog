import AuthenticatedRoute from '../components/AuthenticatedRoute'
import Navbar from '../components/Navbar';
import Problems from '../components/Problems';

function Home() {
  return (
    <div>
      <Navbar pageName="home" />
      <Problems />
    </div>
  )
}

export default AuthenticatedRoute(Home);
