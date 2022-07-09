import AuthenticatedRoute from '../components/AuthenticatedRoute'
import Navbar from '../components/Navbar';
import Problems from '../components/Problems';

function Home() {
  return (
    <div>
      <Navbar />
      <Problems />
    </div>
  )
}

export default AuthenticatedRoute(Home);
