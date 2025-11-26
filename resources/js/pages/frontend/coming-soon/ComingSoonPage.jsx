import React from 'react';
import { ComingSoon } from '../../../components/frontend/ComingSoon';

const ComingSoonPage = ({ title = "Coming Soon" }) => {
    return (
        <div className="min-h-screen">
            <ComingSoon />
        </div>
    );
};

export default ComingSoonPage;
