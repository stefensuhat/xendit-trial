import { Main as MainLayout } from 'components/layouts';
import { Newsletter, Favorite, University } from 'modules';
import { newsletterPath, universitiesPath, favoritePath } from 'utils/routeConstant';

function generateRoute({
    exact = true, component, layout = MainLayout, path, requireAuth = false, nav = { title: '', icon: '' },
}) {
    return {
        nav,
        exact,
        component,
        layout,
        path,
        requireAuth,
    };
}

const routeLists = [
    generateRoute({
        nav: { title: 'Dashboard' }, exact: false, component: University, path: '/',
    }),
    generateRoute({ nav: { title: 'University' }, component: University, path: universitiesPath }),
    generateRoute({ nav: { title: 'Newsletter' }, component: Newsletter, path: newsletterPath }),
    generateRoute({ nav: { title: 'Favorite' }, component: Favorite, path: favoritePath }),
];

export default routeLists;
