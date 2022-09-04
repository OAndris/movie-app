import './IndexPage.scss';
import Searchbox from '../../components/Searchbox/Searchbox';

const IndexPage = () => (
    <article className="index-page">
        <h2>Find the movies you love!</h2>
        <Searchbox />
    </article>
);

export default IndexPage;
