import { Link } from 'react-router-dom';

export function TasksetNotSelectedView() {
    return (
        <div>
            Please select{' '}
            <Link to="/tasksets" className="text-yellow-300">
                taskset
            </Link>{' '}
            before applying for assignment.
        </div>
    );
}
