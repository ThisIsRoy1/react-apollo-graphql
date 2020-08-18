import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useApolloClient} from 'react-apollo';

import Link from './Link';


const Search = ({foo}) => {

    const [links, setLinks] = useState([]);
    const [filter, setFilter] = useState('');

    const client = useApolloClient();

    const FEED_SEARCH_QUERY = gql`
        query FeedSearchQuery($filter: String!) {
            feed(filter: $filter) {
                links {
                    id
                    url
                    description
                    createdAt
                    postedBy {
                        id
                        name
                    }
                    votes {
                        id
                        user {
                            id
                        }
                    }
                }
            }
        }
    `;

    const _executeSearch = async () => {
        // ... you'll implement this 🔜
        const result = await client.query({
            query: FEED_SEARCH_QUERY,
            variables: {filter},
        })
        const linksFromServer = result.data.feed.links;
        setLinks(linksFromServer);
    };

    return (
        <div>
            <div>
                Search
                <input
                    type='text'
                    onChange={e => setFilter(e.target.value)}
                />
                <button onClick={_executeSearch}>OK</button>
            </div>
            {links.map((link, index) => (
                <Link key={link.id} link={link} index={index}/>
            ))}
        </div>
    )


    // export default withApollo(Search)
};

export default Search;


