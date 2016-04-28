package io.m18.skel.route;

import io.m18.skel.processor.WsProcessor;
import lombok.Getter;
import lombok.Setter;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Workflow:
 * - Watch the demoFolder
 * - Read content from new files
 * - Send the data async to the wireTap endpoint
 * - The processor prepares for the JSON conversion by putting the data in a map
 * - Json conversion via GSON
 * - Output to demoLogger
 *
 * @author Wolfram Huesken <woh@m18.io>
 */
@Component
@Profile({"dev"})
@ConfigurationProperties(prefix="routes.MetricsUpdate")
public class MetricsUpdateRoute extends RouteBuilder {

    @Getter @Setter
    private String wireTap;

    @Getter @Setter
    private String webserver;

    @Getter @Setter
    private String websocket;

    @Autowired
    private WsProcessor wsProcessor;

    @Override
    public void configure() {
        from(webserver).routeId(getClass().getSimpleName())
            .convertBodyTo(String.class)
            .wireTap(wireTap)
            .convertBodyTo(String.class)
            .to(websocket);
    }

}
