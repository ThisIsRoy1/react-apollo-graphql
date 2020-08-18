import React, {useState} from 'react';
import {useMutation} from 'react-apollo';
import {useHistory} from 'react-router-dom';
import gql from 'graphql-tag';
import { FEED_QUERY } from './LinkList'

const CreateLink = () => {
    const history = useHistory();

    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const POST_MUTATION = gql`
        mutation PostMutation($description: String!, $url: String!) {
            post(description: $description, url: $url) {
                id
                createdAt
                url
                description
            }
        }
    `;

    const [postMutation, {
        data,
        loading,
        error
    }] = useMutation(POST_MUTATION, {
        variables: {
            description, url
        },
        onCompleted: () => history.push('/'),
        update: (store, { data: { post } }) => {
        const data = store.readQuery({ query: FEED_QUERY })
        data.feed.links.unshift(post)
        store.writeQuery({
            query: FEED_QUERY,
            data
        })
    }
    });

    console.log(data);
    console.log(loading);
    console.log(error);
    return (
        <div>
            <div className="flex flex-column mt3">
                <input
                    className="mb2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    placeholder="A description for the link"
                />
                <input
                    className="mb2"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    type="text"
                    placeholder="The URL for the link"
                />
            </div>
            <button onClick={postMutation}>Submit</button>
        </div>
    )

};

export default CreateLink;


