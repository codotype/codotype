<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card no-body class="p-4">
            <b-card-body>
              <b-form>
                <h1>Register</h1>
                <p class="text-muted">Sign In to your account</p>

                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="username email" />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" class="px-4">Register</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0" to="/auth/reset_password">Forgot password?</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>
