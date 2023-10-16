import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getProfileByID } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExp from "./ProfileExp";
import ProfileEdu from "./ProfileEdu";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
	getProfileByID,

	profile: { profile, loading },
	auth,
}) => {
	const { id } = useParams();
	useEffect(() => {
		getProfileByID(id);
	}, [getProfileByID, id]);
	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Back to profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
					<div class='profile-grid my-1'>
						<ProfileTop profile={profile}></ProfileTop>
						<ProfileAbout profile={profile}></ProfileAbout>
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((experience) => (
										<ProfileExp
											key={experience._id}
											experience={experience}
										></ProfileExp>
									))}
								</Fragment>
							) : (
								<h4>No Experience</h4>
							)}
						</div>
						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map((education) => (
										<ProfileEdu
											key={education._id}
											education={education}
										></ProfileEdu>
									))}
								</Fragment>
							) : (
								<h4>No Education</h4>
							)}
						</div>
						{profile.githubusername && (
							<ProfileGithub username={profile.githubusername}></ProfileGithub>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileByID: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
