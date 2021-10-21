package com.cashgrab;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MainActivity extends ReactActivity {

 private static final String TAG = "CashGrab";

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CashGrab";
  }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // SplashScreen.show(this);
        super.onCreate(savedInstanceState);

        get(this, "SHA1");
    } 
    /**
     * @param key string like: SHA1, SHA256, MD5.
     */
    @SuppressLint("PackageManagerGetSignatures") // test purpose
    public static void get(Context context, String key) {
        try {
            final PackageInfo info = context.getPackageManager()
                    .getPackageInfo(BuildConfig.APPLICATION_ID, PackageManager.GET_SIGNATURES);

            for (Signature signature : info.signatures) {
                final MessageDigest md = MessageDigest.getInstance(key);
                md.update(signature.toByteArray());

                final byte[] digest = md.digest();
                final StringBuilder toRet = new StringBuilder();
                for (int i = 0; i < digest.length; i++) {
                    if (i != 0) toRet.append(":");
                    int b = digest[i] & 0xff;
                    String hex = Integer.toHexString(b);
                    if (hex.length() == 1) toRet.append("0");
                    toRet.append(hex);
                }

                Log.d(TAG, key + " " + toRet.toString());
            }
        } catch (PackageManager.NameNotFoundException e1) {
            Log.e(TAG, "name not found " + e1.toString());
        } catch (NoSuchAlgorithmException e) {
            Log.e(TAG, "no such an algorithm " + e.toString());
        } catch (Exception e) {
            Log.e(TAG, "exception " + e.toString());
        }
    }

      public static void printHashKey(Context pContext) {
        try {
            PackageInfo info = pContext.getPackageManager().getPackageInfo(pContext.getPackageName(), PackageManager.GET_SIGNATURES);
            for (Signature signature : info.signatures) {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                String hashKey = new String(Base64.encode(md.digest(), 0));
                Log.d(TAG, "printHashKey() Hash Key: " + hashKey);
            }
        } catch (Exception e) {
            Log.e(TAG, "printHashKey()", e);
        }
    }


}
