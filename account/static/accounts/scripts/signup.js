const signupCard = document.querySelector('.signup-card');





themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
    signupTheme();
    category_list();
    theme();
  } else {
    localStorage.setItem('theme-mood','dark');
    signupTheme();
    category_list();
    theme();
  }
  chatRoomsTheme();
}

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  signupLanguage();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  signupLanguage();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  signupLanguage();
  category_list();
  language();
}
const signupLanguage = () => {
  const signupCardTitle = document.querySelector('.signup-card-title')
  const signupUsername = document.querySelector('.login-usename');
  const signupPassConf = document.querySelector('.login-password-confirmation');
  const usernameHelpText = document.querySelector('.help-text__username');
  const emailHelpText = document.querySelector('.help-text__email');
  const passwordHelpText = document.querySelector('.help-text__password1');
  const helpTextpassword2 = document.querySelector('.help-text__password2');
  const helptextpass2 = document.querySelector('.help-text__password2');
  const loginLink = document.querySelector('.login-link');
  let sLanguage = localStorage.getItem('language');
  if (sLanguage === 'ar') {
    signupCardTitle ? signupCardTitle.textContent = 'تسجيل حساب جديد':'';
    signupUsername ? signupUsername.textContent = 'إسم المستخدم':'';
    signupPassConf ? signupPassConf.textContent = 'تأكيد كلمة المرور':'';
    usernameHelpText ? usernameHelpText.textContent = 'مطلوب. 150 حرفًا أو أقل. أحرف وأرقام و @ /. / + / - / _ فقط.':'';
    emailHelpText ? emailHelpText.textContent = 'البريد الالكتروني مطلوب.':'';
    passwordHelpText ? passwordHelpText.innerHTML = `<ul>
      <li>لا يمكن أن تكون كلمة مرورك مشابهة جدًا لمعلوماتك الشخصية الأخرى.</li>
      <li>يجب أن تحتوي كلمة المرور الخاصة بك على 8 أحرف على الأقل.</li>
      <li>لا يمكن أن تكون كلمة مرورك كلمة مرور شائعة الاستخدام.</li>
      <li>لا يمكن أن تكون كلمة مرورك رقمية بالكامل.</li>
    </ul>` : '';
    helptextpass2 ? helptextpass2.textContent = 'أدخل نفس كلمة المرور السابقة للتحقق.' : '';
    loginLink ? loginLink.innerHTML = 'يمكنك <a href="/accounts/login"> تسجيل الدخول هنا. </a>' : '';
  } else if (sLanguage === 'en') {
    signupCardTitle ? signupCardTitle.textContent = 'Register New Account':'';
    signupUsername ? signupUsername.textContent = 'username':'';
    signupPassConf ? signupPassConf.textContent = 'password confirmation':'';
    usernameHelpText ? usernameHelpText.textContent = 'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.':'';
    emailHelpText ? emailHelpText.textContent = 'Email is required.':'';
    passwordHelpText ? passwordHelpText.innerHTML = `<ul>
        <li>Your password can’t be too similar to your other personal information.</li>
        <li>Your password must contain at least 8 characters.</li>
        <li>Your password can’t be a commonly used password.</li>
        <li>Your password can’t be entirely numeric.</li>
      </ul>` : '';
    
    helptextpass2 ? helptextpass2.textContent = 'Enter the same password as before, for verification. ' : '';
    loginLink ? loginLink.innerHTML = 'You can <a href="/accounts/login">login here.</a>':'';
  } else if (sLanguage === 'fr') {
    signupCardTitle ? signupCardTitle.textContent = 'Nouveau Compte':'';
    signupUsername ? signupUsername.textContent = "Nom d'utilisateur":'';
    signupPassConf ? signupPassConf.textContent = 'confirmer le mot de passe':'';
    usernameHelpText ? usernameHelpText.textContent = 'Obligatoire. 150 caractères ou moins. Lettres, chiffres et @/./+/-/_ uniquement.':'';
    emailHelpText ? emailHelpText.textContent = 'E-mail est requis.':'';
    passwordHelpText ? passwordHelpText.innerHTML = `<ul>
        <li>Votre mot de passe ne doit pas être trop similaire à vos autres informations personnelles.</li>
        <li>Votre mot de passe doit contenir au moins 8 caractères.</li>
        <li>Votre mot de passe ne peut pas être un mot de passe couramment utilisé.</li>
        <li>Votre mot de passe ne peut pas être entièrement numérique.</li>
      </ul>` : '';
    helptextpass2 ? helptextpass2.textContent = "Entrez le même mot de passe qu'avant, pour vérification.":'';
    loginLink ? loginLink.innerHTML = 'Vous pouvez <a href="/accounts/login">vous connecter ici.</a>':'';
  } else {
    localStorage.setItem('language','en');
  }
}
signupLanguage()
const signupTheme = () => {
  let themesignup = localStorage.getItem('theme-mood');
  if (themesignup === 'dark') {
    signupCard.classList = 'signup-card dark';
  } else {
    signupCard.classList = 'signup-card light';
  }
}
signupTheme()