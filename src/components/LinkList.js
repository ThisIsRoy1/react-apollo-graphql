import React from 'react';
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';
import Link from "./Link";

export const FEED_QUERY = gql`
    {
        feed {
            links {
                id
                createdAt
                url
                description
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

const LinkList = () => {

    const _updateCacheAfterVote = (store, createVote, linkId) => {
        const data = store.readQuery({query: FEED_QUERY})

        const votedLink = data.feed.links.find(link => link.id === linkId)
        votedLink.votes = createVote.link.votes

        store.writeQuery({query: FEED_QUERY, data})
    };

    const {
        data,
        loading,
        error
    } = useQuery(FEED_QUERY);

    if (loading) return <div>Fetching</div>
    if (error) return <div>Error</div>
    if (!data) return <div>Not found</div>;

    const linksToRender = data.feed.links;

    return (
        <div>
            {linksToRender.map((link, index) =>
                <Link key={link.id} link={link} index={index}
                      updateStoreAfterVote={_updateCacheAfterVote}/>)}
        </div>
    );
};

export default LinkList;
