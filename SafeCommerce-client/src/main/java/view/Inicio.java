package view;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.DiscosGroup;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.util.Conversor;
import dao.Conexao;
import dao.Leitura;
import dao.Parametro;
import dao.ParametroDao;
import dao.Servidor;
import getmac.GetMac;
import io.nayuki.qrcodegen.*;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.ui.ApplicationFrame;
import org.jfree.ui.RefineryUtilities;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.GroupLayout.Alignment;
import javax.swing.GroupLayout;
import javax.swing.LayoutStyle.ComponentPlacement;
import javax.swing.JPanel;
import javax.swing.Timer;

import java.awt.Color;
import java.awt.Dimension;

import javax.swing.JLabel;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.NetworkInterface;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.swing.JButton;
import org.springframework.jdbc.core.JdbcTemplate;
import oshi.hardware.NetworkIF;

/**
 *
 * @author aluno
 */
public class Inicio extends javax.swing.JFrame {

    Leitura leitura = new Leitura();
    /**
     * Creates new form Inicio
     */
    static DefaultCategoryDataset dataset = new DefaultCategoryDataset();
    static JFreeChart lineChart;
    static ChartPanel chartPanel;

    public Inicio() {
        getContentPane().setBackground(new Color(255, 255, 255));
        initComponents();
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setResizable(false);
        setTitle("SafeCommerce - Monitoramento");
        ImageIcon img = new ImageIcon(getClass().getResource("/img/logo.png"));
        setIconImage(img.getImage());
        dataset.addValue(2, "a", "d");

    }

    private void Monitorando(Double cpu, Double ram, Double disco) throws Exception {
        GetMac gm=new GetMac();
        String mac=gm.getMac();
        mac = mac.replace("-", ":");
        System.out.println("Mac address: "+" "+""+mac);
        System.out.println(mac);
        Conexao connection = new Conexao();
        JdbcTemplate con = connection.getConnection();
        ParametroDao parametroDao = new ParametroDao();
        Servidor servidor = new Servidor();
        Looca looca = new Looca();
        Processador proc = looca.getProcessador();
        Conversor conversor = new Conversor();

        Integer fkServidor = servidor.getIdServidor(mac);

        List<Parametro> parametros = parametroDao.getParametros(fkServidor);
        System.out.println(parametros.get(0).getFkMetrica());
        System.out.println(parametros.get(1).getFkMetrica());

        for (int i = 0; i < parametros.size(); i++) {
            Integer atual = parametros.get(i).getFkMetrica();
            System.out.println(atual);
            String cpuFormat = String.format("%.1f", cpu);

            if (atual == 1) {
                con.update("INSERT INTO Leitura VALUES (?, ?, NOW(), ?, 'CPU')", fkServidor, parametros.get(i).getFkMetrica(), (proc.getUso()));
            } else if (atual == 2) {
                con.update("INSERT INTO Leitura VALUES (?, ?, NOW(), ?, 'CPU')", fkServidor, parametros.get(i).getFkMetrica(), (proc.getNumeroCpusLogicas()));
            } else if (atual == 3) {
                con.update("INSERT INTO Leitura VALUES (?, ?, NOW(), ?, 'CPU')", fkServidor, parametros.get(i).getFkMetrica(), (cpuFormat));
            } else if (atual == 4) {
                con.update("INSERT INTO Leitura VALUES (?, ?, NOW(), ?, 'CPU')", fkServidor, parametros.get(i).getFkMetrica(), (proc.getFrequencia()));
            } else if (parametros.get(i).getFkMetrica() == 5) {
                con.update("INSERT INTO Leitura VALUES (?, ?, NOW(), ?, 'CPU')", fkServidor, parametros.get(i).getFkMetrica(), (looca.getMemoria().getTotal()));
            } else if (parametros.get(i).getFkMetrica() == 6) {
                con.update("INSERT INTO Leitura VALUES (?, ?, NOW(), ?, 'Ram')", fkServidor, parametros.get(i).getFkMetrica(), ram);
            } else if (parametros.get(i).getFkMetrica() == 7) {
                con.update("INSERT INTO Leitura VALUES (?, ?, NOW(), ?, 'Disco')", fkServidor, parametros.get(i).getFkMetrica(), conversor.formatarBytes(looca.getGrupoDeDiscos().getTamanhoTotal()));
            } else if (parametros.get(i).getFkMetrica() == 8 ){
                con.update("INSERT INTO Leitura VALUES (?, ?, NOW(), ?, 'Disco')", fkServidor, parametros.get(i).getFkMetrica(), disco);
            } else if (parametros.get(i).getFkMetrica() == 9 ){
                con.update("INSERT INTO Leitura VALUES (?, ?, NOW(), ?, 'Disco')", fkServidor, parametros.get(i).getFkMetrica(), looca.getGrupoDeDiscos());
            }

            System.out.println("GRAVADO NO BANCO");

            // parametrosG = parametros;
        }

    }

    // List<Parametro> parametrosG;
    /*List<Leitura> leituraCpu = leitura.getCpu();
    List<Leitura> leituraRam = leitura.getRam();
    List<Leitura> leituraDisco = leitura.getDisco();*/
    private static final int N = 100;
    private static final Random random = new Random();

    private XYSeriesCollection gerarDataset() {
        XYSeriesCollection dataset = new XYSeriesCollection();
        final XYSeries cpuSeries = new XYSeries("CPU");
        final XYSeries ramSeries = new XYSeries("RAM");
        final XYSeries discoSeries = new XYSeries("Disco");
        Looca looca = new Looca();
        Memoria ram = looca.getMemoria();
        Processador cpu = looca.getProcessador();
        DiscosGroup rom = looca.getGrupoDeDiscos();
        Conversor conversor = new Conversor();

        List<Volume> volumes = rom.getVolumes();
        Double usoVolume = 0d;
        Long totalVolume = 0l;

        for (Volume volume : volumes) {
            totalVolume += volume.getTotal();
            Long totalVolumeAtual = volume.getTotal();
            Long volumeDisponivel = volume.getDisponivel();
            usoVolume += Double.valueOf(totalVolumeAtual) - Double.valueOf(volumeDisponivel);
        }
        Double porcentagemVolume = (usoVolume / totalVolume) * 100;

        Long ramUso = ram.getEmUso();
        Long ramTotal = ram.getTotal();
        Double porcentagemRam = (Double.valueOf(ramUso) / Double.valueOf(ramTotal)) * 100;

        for (int i = 0; i < 2; i++) {
            cpuSeries.add(i, cpu.getUso());
            ramSeries.add(i, porcentagemRam);
            discoSeries.add(i, porcentagemVolume);

        }
        new Timer(100, new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                // colocar os dados sobre uso de hardware dentro da cpuSeries, ram Series e discoSeries, sempre usando .getItemCount()
                // trocar o random pelo uso do Looca

                Memoria ram = looca.getMemoria();
                Processador cpu = looca.getProcessador();
                DiscosGroup rom = looca.getGrupoDeDiscos();
                Conversor conversor = new Conversor();

                List<Volume> volumes = rom.getVolumes();
                Double usoVolume = 0d;
                Long totalVolume = 0l;

                for (Volume volume : volumes) {
                    totalVolume += volume.getTotal();
                    Long totalVolumeAtual = volume.getTotal();
                    Long volumeDisponivel = volume.getDisponivel();
                    usoVolume += Double.valueOf(totalVolumeAtual) - Double.valueOf(volumeDisponivel);
                }
                Double porcentagemVolume = (usoVolume / totalVolume) * 100;

                Long ramUso = ram.getEmUso();
                Long ramTotal = ram.getTotal();
                Double porcentagemRam = (Double.valueOf(ramUso) / Double.valueOf(ramTotal)) * 100;
                try{
                Monitorando(cpu.getUso(), porcentagemRam, porcentagemVolume);
                cpuSeries.add(cpuSeries.getItemCount(), cpu.getUso());
                ramSeries.add(ramSeries.getItemCount(), porcentagemRam);
                discoSeries.add(discoSeries.getItemCount(), porcentagemVolume);
                }catch(Exception ed){
                    System.out.println(ed);
                }
            }
        }).start();
        dataset.addSeries(cpuSeries);
        dataset.addSeries(ramSeries);
        dataset.addSeries(discoSeries);
        return dataset;
    }

    private ChartPanel createPane() {
        final XYSeries series = new XYSeries("Data");
        for (int i = 0; i < random.nextInt(N) + N / 2; i++) {
            series.add(i, 30);
        }
        XYSeriesCollection dataset = gerarDataset();
        new Timer(1000, new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                series.add(series.getItemCount(), 30);
            }
        }).start();
        JFreeChart chart = ChartFactory.createXYLineChart("Monitoramento", "Leitura",
                "Porcentagem de uso (%)", dataset, PlotOrientation.VERTICAL, true, true, true);

        return new ChartPanel(chart);
    }

    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        labelSaudacao = new javax.swing.JLabel();
        labelSaudacao.setFont(new Font("Roboto Black", Font.PLAIN, 16));
        qrCodeLabel = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jPanel1.setBackground(new java.awt.Color(255, 255, 255));
        JButton verProcessos = new JButton("Processos");
        verProcessos.setForeground(new Color(255, 255, 255));
        verProcessos.setBackground(new Color(246, 0, 0));
        verProcessos.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                ProcTable processos = new ProcTable();
                processos.criaJanela();
            }
        });

        labelSaudacao.setText("Bom dia, Gabriel!");

        labelSaudacao_1 = new JLabel();
        labelSaudacao_1.setText("Monitore também pelo celular!");

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1Layout.setHorizontalGroup(
                jPanel1Layout.createParallelGroup(Alignment.LEADING)
                        .addGroup(jPanel1Layout.createSequentialGroup()
                                .addContainerGap()
                                .addComponent(qrCodeLabel, GroupLayout.PREFERRED_SIZE, 226, Short.MAX_VALUE)
                                .addGroup(jPanel1Layout.createParallelGroup(Alignment.LEADING)
                                        .addGroup(jPanel1Layout.createSequentialGroup()
                                                .addGap(71)
                                                .addComponent(labelSaudacao))
                                        .addGroup(jPanel1Layout.createSequentialGroup()
                                                .addGap(95)
                                                .addComponent(verProcessos)))
                                .addGap(284))
                        .addGroup(jPanel1Layout.createSequentialGroup()
                                .addGap(32)
                                .addComponent(labelSaudacao_1, GroupLayout.PREFERRED_SIZE, 169, GroupLayout.PREFERRED_SIZE)
                                .addContainerGap(523, Short.MAX_VALUE))
        );
        jPanel1Layout.setVerticalGroup(
                jPanel1Layout.createParallelGroup(Alignment.LEADING)
                        .addGroup(jPanel1Layout.createSequentialGroup()
                                .addGroup(jPanel1Layout.createParallelGroup(Alignment.LEADING)
                                        .addGroup(jPanel1Layout.createSequentialGroup()
                                                .addGap(20)
                                                .addComponent(labelSaudacao)
                                                .addGap(28)
                                                .addComponent(verProcessos))
                                        .addGroup(jPanel1Layout.createSequentialGroup()
                                                .addContainerGap()
                                                .addComponent(qrCodeLabel, GroupLayout.PREFERRED_SIZE, 103, GroupLayout.PREFERRED_SIZE)))
                                .addPreferredGap(ComponentPlacement.RELATED, 8, Short.MAX_VALUE)
                                .addComponent(labelSaudacao_1))
        );
        jPanel1.setLayout(jPanel1Layout);


        QrCode qr0 = QrCode.encodeText("http://www.facebook.com", QrCode.Ecc.MEDIUM);
        BufferedImage img = toImage(qr0, 4, 10); // See QrCodeGeneratorDemo
        String caminho = System.getProperty("java.io.tmpdir") + "/qr-code.png";

        try {
            ImageIO.write(img, "png", new File(caminho));
            qrCodeLabel.setIcon(new javax.swing.ImageIcon(caminho));

        } catch (IOException ex) {
            Logger.getLogger(Inicio.class.getName()).log(Level.SEVERE, null, ex);
        }

        JFreeChart lineChart = ChartFactory.createLineChart("Monitoramento", "Leitura", "Utilização", dataset,
                PlotOrientation.VERTICAL, true, true, false);

        JPanel panel = new JPanel();
        panel.add(createPane());
        panel.setBackground(new Color(255, 255, 255));

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        layout.setHorizontalGroup(layout.createParallelGroup(Alignment.TRAILING)
                .addComponent(jPanel1, Alignment.LEADING, GroupLayout.DEFAULT_SIZE, 672, Short.MAX_VALUE)
                .addComponent(panel, Alignment.LEADING, GroupLayout.DEFAULT_SIZE, 672, Short.MAX_VALUE));
        layout.setVerticalGroup(layout.createParallelGroup(Alignment.LEADING).addGroup(layout.createSequentialGroup()
                .addComponent(jPanel1, GroupLayout.PREFERRED_SIZE, 136, GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(ComponentPlacement.RELATED, GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(panel, GroupLayout.PREFERRED_SIZE, 448, GroupLayout.PREFERRED_SIZE).addContainerGap()));
        getContentPane().setLayout(layout);

        pack();
    }// </editor-fold>                        

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {

        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Inicio.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Inicio.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Inicio.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Inicio.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        // </editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Inicio().setVisible(true);

            }
        });
    }

    /*---- Utilities ----*/
    private static BufferedImage toImage(QrCode qr, int scale, int border) {
        return toImage(qr, scale, border, 0xFFFFFF, 0x000000);
    }

    /**
     * Returns a raster image depicting the specified QR Code, with the
     * specified module scale, border modules, and module colors.
     * <p>
     * For example, scale=10 and border=4 means to pad the QR Code with 4 light
     * border modules on all four sides, and use 10&#xD7;10 pixels to represent
     * each module.
     *
     * @param qr the QR Code to render (not {@code null})
     * @param scale the side length (measured in pixels, must be positive) of
     * each module
     * @param border the number of border modules to add, which must be
     * non-negative
     * @param lightColor the color to use for light modules, in 0xRRGGBB format
     * @param darkColor the color to use for dark modules, in 0xRRGGBB format
     * @return a new image representing the QR Code, with padding and scaling
     * @throws NullPointerException if the QR Code is {@code null}
     * @throws IllegalArgumentException if the scale or border is out of range,
     * or if {scale, border, size} cause the image dimensions to exceed
     * Integer.MAX_VALUE
     */
    private static BufferedImage toImage(QrCode qr, int scale, int border, int lightColor, int darkColor) {
        Objects.requireNonNull(qr);
        if (scale <= 0 || border < 0) {
            throw new IllegalArgumentException("Value out of range");
        }
        if (border > Integer.MAX_VALUE / 2 || qr.size + border * 2L > Integer.MAX_VALUE / scale) {
            throw new IllegalArgumentException("Scale or border too large");
        }

        BufferedImage result = new BufferedImage((qr.size + border * 2) * scale, (qr.size + border * 2) * scale,
                BufferedImage.TYPE_INT_RGB);
        for (int y = 0; y < result.getHeight(); y++) {
            for (int x = 0; x < result.getWidth(); x++) {
                boolean color = qr.getModule(x / scale - border, y / scale - border);
                result.setRGB(x, y, color ? darkColor : lightColor);
            }
        }
        return result;
    }

    // Helper function to reduce code duplication.
    private static void writePng(BufferedImage img, String filepath) throws IOException {
        ImageIO.write(img, "png", new File(filepath));
    }

    /**
     * Returns a string of SVG code for an image depicting the specified QR
     * Code, with the specified number of border modules. The string always uses
     * Unix newlines (\n), regardless of the platform.
     *
     * @param qr the QR Code to render (not {@code null})
     * @param border the number of border modules to add, which must be
     * non-negative
     * @param lightColor the color to use for light modules, in any format
     * supported by CSS, not {@code null}
     * @param darkColor the color to use for dark modules, in any format
     * supported by CSS, not {@code null}
     * @return a string representing the QR Code as an SVG XML document
     * @throws NullPointerException if any object is {@code null}
     * @throws IllegalArgumentException if the border is negative
     */
    private static String toSvgString(QrCode qr, int border, String lightColor, String darkColor) {
        Objects.requireNonNull(qr);
        Objects.requireNonNull(lightColor);
        Objects.requireNonNull(darkColor);
        if (border < 0) {
            throw new IllegalArgumentException("Border must be non-negative");
        }
        long brd = border;
        StringBuilder sb = new StringBuilder().append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n").append(
                "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n")
                .append(String.format(
                        "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 %1$d %1$d\" stroke=\"none\">\n",
                        qr.size + brd * 2))
                .append("\t<rect width=\"100%\" height=\"100%\" fill=\"" + lightColor + "\"/>\n")
                .append("\t<path d=\"");
        for (int y = 0; y < qr.size; y++) {
            for (int x = 0; x < qr.size; x++) {
                if (qr.getModule(x, y)) {
                    if (x != 0 || y != 0) {
                        sb.append(" ");
                    }
                    sb.append(String.format("M%d,%dh1v1h-1z", x + brd, y + brd));
                }
            }
        }
        return sb.append("\" fill=\"" + darkColor + "\"/>\n").append("</svg>\n").toString();
    }

    // Variables declaration - do not modify                     
    private javax.swing.JPanel jPanel1;
    private javax.swing.JLabel labelSaudacao;
    private javax.swing.JLabel qrCodeLabel;
    private JLabel labelSaudacao_1;
}
