package cz.biflovna.app;

import android.content.ClipData;
import android.content.Intent;
import android.net.Uri;
import android.util.Base64;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/** Stáhne novou verzi APK z GitHub Releases přímo v aplikaci a otevře systémovou instalaci. */
@CapacitorPlugin(name = "Updater")
public class UpdaterPlugin extends Plugin {

    /** Uloží PDF do cache a otevře systémovou nabídku (uložit do souborů, poslat…). */
    @PluginMethod
    public void sharePdf(PluginCall call) {
        String data = call.getString("data");
        String name = call.getString("name", "Biflovna.pdf").replaceAll("[^A-Za-z0-9._-]", "_");
        if (data == null) {
            call.reject("chybí data");
            return;
        }
        new Thread(() -> {
            try {
                File dir = new File(getContext().getCacheDir(), "pdf");
                dir.mkdirs();
                File pdf = new File(dir, name);
                try (FileOutputStream out = new FileOutputStream(pdf)) {
                    out.write(Base64.decode(data, Base64.DEFAULT));
                }
                Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", pdf);
                Intent i = new Intent(Intent.ACTION_SEND);
                i.setType("application/pdf");
                i.putExtra(Intent.EXTRA_STREAM, uri);
                i.setClipData(ClipData.newRawUri("", uri));
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                getActivity().runOnUiThread(() -> getActivity().startActivity(Intent.createChooser(i, "Uložit nebo poslat PDF")));
                call.resolve();
            } catch (Exception e) {
                call.reject("PDF se nepodařilo uložit: " + e.getMessage());
            }
        }).start();
    }

    @PluginMethod
    public void install(PluginCall call) {
        String url = call.getString("url");
        if (url == null || !url.startsWith("https://github.com/")) {
            call.reject("neplatná adresa");
            return;
        }
        new Thread(() -> {
            try {
                File dir = new File(getContext().getCacheDir(), "updates");
                dir.mkdirs();
                File apk = new File(dir, "Biflovna.apk");
                if (apk.exists()) apk.delete();

                HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
                c.setInstanceFollowRedirects(true);
                c.setConnectTimeout(15000);
                c.setReadTimeout(30000);
                c.setRequestProperty("User-Agent", "Biflovna-updater");
                int total = c.getContentLength();
                try (InputStream in = c.getInputStream(); FileOutputStream out = new FileOutputStream(apk)) {
                    byte[] buf = new byte[65536];
                    long done = 0;
                    int n, lastPct = -1;
                    while ((n = in.read(buf)) > 0) {
                        out.write(buf, 0, n);
                        done += n;
                        if (total > 0) {
                            int pct = (int) (done * 100 / total);
                            if (pct != lastPct) {
                                lastPct = pct;
                                JSObject p = new JSObject();
                                p.put("percent", pct);
                                notifyListeners("progress", p);
                            }
                        }
                    }
                }
                if (apk.length() < 500_000) throw new Exception("poškozené stažení");

                Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", apk);
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.setDataAndType(uri, "application/vnd.android.package-archive");
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
                getActivity().runOnUiThread(() -> getContext().startActivity(i));
                JSObject r = new JSObject();
                r.put("ok", true);
                call.resolve(r);
            } catch (Exception e) {
                call.reject("Stažení se nepovedlo: " + e.getMessage());
            }
        }).start();
    }
}
