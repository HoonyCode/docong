package com.b5f1.docong.config.oauth.provider;

public interface OAuthUserInfo {
    String getProviderId();

    String getProvider();

    String getEmail();

    String getName();
}
