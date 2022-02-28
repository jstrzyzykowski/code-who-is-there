import React from 'react';
import {Route, Switch} from 'react-router-dom';

import SettingsPasswordForm from '../../../../components/forms/settings-password-form/settings-password-form.component';
import SettingsProfileForm from '../../../../components/forms/settings-profile-form/settings-profile-form.component';

import './settings-option.styles.scss';

export default function SettingsOptionPage() {
  return (
    <div className='settingsOptionPage'>
      <Switch>
        <Route exact path='/app/settings/profile' component={SettingsProfileForm}/>
        <Route exact path='/app/settings/password' component={SettingsPasswordForm}/>
      </Switch>
    </div>
  );
}