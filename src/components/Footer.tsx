import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-dark3 py-6 text-center text-muted text-sm font-light">
      <p>
        Copyright &copy; {new Date().getFullYear()} Aniruddha. Portfolio website made with{' '}
        <FontAwesomeIcon icon={faHeart} className="text-gold mx-1" /> by Me.
      </p>
    </footer>
  );
}
